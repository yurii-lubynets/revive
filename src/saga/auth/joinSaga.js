import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { AUTH_SERVICE } from '../../common/constant/ServiceNameConst'

import { REGISTER_NEW_USER, REGISTER_NEW_SP } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'

export function* joinSaga({ user, history }) {
  try {
    const response = yield call(post, '/signup', user, AUTH_SERVICE, false)

    yield put({ type: actionKind.success(REGISTER_NEW_USER), response })
    yield history.push('/account/join-verify-email')
  } catch (error) {
    const { response } = error
    const { status, data } = response

    if (status === 409) {
      yield put({ type: actionKind.error(`${REGISTER_NEW_USER}|${response.status}`), errorMessage: data.errorMessage })
    }

    yield put({ type: actionKind.error(REGISTER_NEW_USER), error })
  }
}

export function* joinSPSaga({ user, history }) {
  try {
    const response = yield call(post, '/signupprovider', user, AUTH_SERVICE, false)

    yield put({ type: actionKind.success(REGISTER_NEW_SP), response })
    yield history.push('/account/join-verify-email-sp')
  } catch (error) {
    const { response } = error
    const { status, data } = response

    if (status === 409) {
      yield put({ type: actionKind.error(`${REGISTER_NEW_SP}|${response.status}`), errorMessage: data.errorMessage })
    }

    yield put({ type: actionKind.error(REGISTER_NEW_SP), error })
  }
}
