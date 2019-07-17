import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_SP_INFO } from '../../action/names/UserActionNames'

export function* loadSPInfoSaga() {
  try {
    const { data } = yield call(get, 'provider/getInfo/', false)
    yield put({ type: actionKind.success(LOAD_SP_INFO), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_INFO) })
  }
}
