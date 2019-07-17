import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_DEFAULT_CONTENT_LIST } from '../../action/names/ContentSearchNames'

export function* loadDefaultContentSaga() {
  try {
    const { data } = yield call(get, 'countries/all', false)
    yield put({ type: actionKind.success(LOAD_DEFAULT_CONTENT_LIST), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_DEFAULT_CONTENT_LIST), error })
  }
}
