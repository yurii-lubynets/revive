import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { AUTH_SERVICE } from '../../common/constant/ServiceNameConst'

import { FORGOT_PASSWORD } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'

export function* forgotSaga({ email }) {
  try {
    yield call(post, '/resetPassword', { email: email.email }, AUTH_SERVICE, false)
    yield put({ type: actionKind.success(FORGOT_PASSWORD) })
    if (email.history) yield email.history.push('/account/forgot-resend-email')
  } catch (error) {
    yield put({ type: actionKind.error(FORGOT_PASSWORD), error })
  }
}
