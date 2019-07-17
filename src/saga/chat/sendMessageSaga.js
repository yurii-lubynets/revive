import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { SEND_MESSAGE, SHOW_MESSAGE } from '../../action/names/ChatActionNames'

export function* sendMessageSaga({ toUserId, text, userId }) {
  try {
    yield call(post, '/sendMessage', { toUserId, text }, CHAT_SERVICE)
    const data = {
      dataCreated: new Date().toISOString(),
      from: userId,
      id: 1,
      isRead: 0,
      text,
      to: toUserId,
    }
    yield put({ type: actionKind.make(SHOW_MESSAGE), data })
  } catch (error) {
    yield put({ type: actionKind.error(SEND_MESSAGE) })
  }
}
