import {
  LOAD_USER_CHATS,
  LOAD_UNREAD_CHATS,
  LOAD_NOTIFICATION_ID,
  UNREAD_MESSAGES_COUNT,
  FLUSH_CHAT,
  FLUSH_CHATS_LIST,
} from '../../action/names/ChatActionNames'
import { LOGOUT } from '../../action/names/AuthActionNames'

import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  chats: [],
  error: false,
  isLoading: false,
  notificationId: '',
  count: 0,
}

export const chatsList = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_USER_CHATS):
      return {
        ...state,
        error: false,
        isLoading: true,
      }
    case success(LOAD_USER_CHATS):
      return {
        ...state,
        chats: action.conversations,
        error: false,
        isLoading: false,
      }
    case error(LOAD_USER_CHATS):
      return {
        ...state,
        chats: [],
        error: true,
        isLoading: false,
      }

    case success(LOAD_UNREAD_CHATS):
      return {
        ...state,
        chats: action.counts,
      }

    case success(UNREAD_MESSAGES_COUNT):
      return {
        ...state,
        count: action.count,
      }

    case success(LOAD_NOTIFICATION_ID):
      return {
        ...state,
        notificationId: action.notificationId,
      }
    case make(FLUSH_CHAT):
      return {
        ...state,
        count: 0,
      }
    case make(FLUSH_CHATS_LIST):
      return {
        ...state,
        chats: [],
      }
    case make(LOGOUT):
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
