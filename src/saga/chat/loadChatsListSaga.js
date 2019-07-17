import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_USER_CHATS } from '../../action/names/ChatActionNames'

export function* loadChatsListSaga() {
  try {
    const {
      data: { conversations },
    } = yield call(get, '/getUserConversations', CHAT_SERVICE)

    //TODO: remove business logic from saga

    conversations.sort(function(a, b) {
      return new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
    })

    yield put({ type: actionKind.success(LOAD_USER_CHATS), conversations })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_USER_CHATS), error })
  }
}
