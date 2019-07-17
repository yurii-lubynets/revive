import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_PROVIDER, FLUSH_CONTACT_PROVIDER } from '../../action/names/ContentSearchNames'

export function* loadProviderSaga({ providerId }) {
  try {
    const { data } = yield call(get, `provider?id=${providerId}`, false)
    yield put({ type: actionKind.success(LOAD_PROVIDER), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_PROVIDER), error })
  }
}

export function* contactProviderSaga() {
  yield delay(4000)
  yield put({ type: actionKind.make(FLUSH_CONTACT_PROVIDER) })
}
