import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { take, put, cancel, fork } from 'redux-saga/effects'

import * as actionKind from '../../action/names/ActionKind'
import {
  RECEIVE_NOTIFICATION,
  RECEIVE_MESSAGE,
  UNREAD_MESSAGES_COUNT,
  CLOSE_NOTIFICATION,
} from '../../action/names/ChatActionNames'

const AUTH_HOST = process.env.REACT_APP_DEFAULT_API_HOST

function connect(notificationId) {
  const socket = io(AUTH_HOST)
  socket.on('connect', () => {
    socket.emit('join', { conversationId: `${notificationId}` })
  })
  socket.on('reconnect', () => {
    socket.emit('join', { conversationId: `${notificationId}` })
  })
  return socket
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('new_msg_conversation', data => {
      const { notificationType, ...rest } = data

      switch (notificationType) {
        case 'ConversationNotification':
          const { conversation, totalUnreadCount } = rest
          emit({
            type: actionKind.make(RECEIVE_MESSAGE),
            data: {
              dataCreated: conversation.message.dataCreated,
              from: conversation.message.from,
              id: conversation.message.id,
              text: conversation.message.text,
              to: conversation.message.to,
            },
          })
          return emit({
            type: actionKind.make(RECEIVE_NOTIFICATION),
            data: {
              conversationId: conversation.conversationId,
              isRead: totalUnreadCount,
              lastMessage: conversation.message.text,
              lastMessageDate: conversation.message.dataCreated,
              userId: conversation.message.from,
            },
          })
        case 'TotalUnreadCount':
          const { totalCount: count } = rest
          return emit({
            type: actionKind.success(UNREAD_MESSAGES_COUNT),
            count,
          })
        default:
          return undefined
      }
    })
    return () => {}
  })
}

function* read(channel) {
  while (true) {
    let action = yield take(channel)
    yield put(action)
  }
}

export function* notificationSaga({ notificationId }) {
  while (true) {
    const socket = connect(notificationId)
    const channel = subscribe(socket)
    const task = yield fork(read, channel)

    yield take(actionKind.make(CLOSE_NOTIFICATION))

    socket.disconnect(true)

    yield cancel(task)
    break
  }
}
