import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_POPULAR_SERVICES } from '../../action/names/ContentSearchNames'

export function* loadPopularServicesSaga() {
  try {
    const { data } = yield call(get, 'popularServices/get', false)
    yield put({ type: actionKind.success(LOAD_POPULAR_SERVICES), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_POPULAR_SERVICES), error })
  }
}
