import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { UNREAD_MESSAGES_COUNT } from '../../action/names/ChatActionNames'

export function* getUnreadMessagesCountSaga() {
  try {
    const {
      data: { totalCount: count },
    } = yield call(get, '/getUnreadMessagesCount', CHAT_SERVICE)

    yield put({ type: actionKind.success(UNREAD_MESSAGES_COUNT), count })
  } catch (error) {
    yield put({ type: actionKind.error(UNREAD_MESSAGES_COUNT), error })
  }
}
