import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_SEARCH_PROVIDERS_LIST } from '../../action/names/ContentSearchNames'

export function* loadSearchProvires({ searchParams }) {
  try {
    const { data } = yield call(post, 'provider/filter', searchParams, true)
    yield put({ type: actionKind.success(LOAD_SEARCH_PROVIDERS_LIST), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SEARCH_PROVIDERS_LIST), error })
  }
}
