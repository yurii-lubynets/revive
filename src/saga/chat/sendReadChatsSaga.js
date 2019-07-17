import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { SEND_READ_CHATS } from '../../action/names/ChatActionNames'

export function* sendReadChatsSaga({ conversationId }) {
  try {
    yield call(get, `/markAllMessagesAsRead?conversationId=${conversationId}`, CHAT_SERVICE)

    yield put({ type: actionKind.success(SEND_READ_CHATS), conversationId })
  } catch (error) {
    yield put({ type: actionKind.error(SEND_READ_CHATS), error })
  }
}
