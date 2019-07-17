import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_UNREAD_CHATS } from '../../action/names/ChatActionNames'

export function* getUnreadChatsSaga({ conversations }) {
  try {
    const list = {
      conversationIds: [...conversations.map(chat => chat.conversationId)],
    }

    const {
      data: { counts },
    } = yield call(post, '/getUnreadCountForConversation', list, CHAT_SERVICE)

    yield put({ type: actionKind.success(LOAD_UNREAD_CHATS), counts })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_UNREAD_CHATS), error })
  }
}
