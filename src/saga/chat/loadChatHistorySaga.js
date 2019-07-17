import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_CHAT_HISTORY, LOAD_PAGE } from '../../action/names/ChatActionNames'

export function* loadChatHistorySaga({ userId, page }) {
  try {
    const {
      data: { messages: conversations },
    } = yield call(get, `/getConversationMessages?fromUserId=${userId}&page=${page}`, CHAT_SERVICE)
    yield put({
      type: actionKind.make(LOAD_PAGE),
      conversations,
      page,
    })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_CHAT_HISTORY), error })
  }
}
