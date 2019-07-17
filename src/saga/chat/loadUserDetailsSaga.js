import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_USER_DETAILS } from '../../action/names/ChatActionNames'

export function* loadUserDetailsSaga({ userId }) {
  try {
    const { data } = yield call(get, `/getConversationMemberInfo?userId=${userId}`, CHAT_SERVICE)

    yield put({ type: actionKind.success(LOAD_USER_DETAILS), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_USER_DETAILS), error })
  }
}
