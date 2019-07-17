import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { AUTH_SERVICE } from '../../common/constant/ServiceNameConst'

import { RESEND_EMAIL } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'

export function* resendSaga({ email }) {
  try {
    yield call(post, '/resendVerificationEmail', email, AUTH_SERVICE, false)
    yield put({ type: actionKind.success(RESEND_EMAIL) })
  } catch (error) {
    yield put({ type: actionKind.error(RESEND_EMAIL) })
  }
}
