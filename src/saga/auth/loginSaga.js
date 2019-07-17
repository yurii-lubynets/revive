import { put, call } from 'redux-saga/effects'
import { post, get, auth } from '../../common/api/index'
import { AUTH_SERVICE } from '../../common/constant/ServiceNameConst'

import { LOGIN, LOGIN_SN, GET_TOKEN } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'
import { AUTH_TOKEN, AUTH_DETAILS_NAME, AUTH_SP } from '../../common/constant/LocalStorageConst'
import { createCookie, deleteCookie } from '../../common/constant/Cookie'

export function* loginSaga({ credentials }) {
  try {
    const { email, password } = credentials
    const { data } = yield call(post, '/signIn', { email, password }, AUTH_SERVICE, false)

    yield call(setAuthDetails, AUTH_TOKEN, data)
    yield put({ type: actionKind.success(LOGIN) })
  } catch (error) {
    const {
      response: { status, data },
    } = error

    yield call(removeAuthDetails, AUTH_TOKEN)
    yield call(removeAuthDetails, AUTH_DETAILS_NAME)

    if (status === 422) {
      credentials.history.push('/account/login-resend-email')
      yield put({ type: actionKind.error(`${LOGIN}|${status}`), error })
    }
    if (status === 409) {
      yield put({ type: actionKind.error(`${LOGIN}|${status}`), errorMessage: data.errorMessage })
    }
    if (status === 403) {
      yield put({ type: actionKind.error(`${LOGIN}|${status}`), errorMessage: data.errorMessage })
    } else {
      yield put({ type: actionKind.error(LOGIN), error })
    }
  }
}

export function* loginSNSaga({ code }) {
  try {
    const { data } = yield call(get, `/signInWithSocial?code=${code}`, AUTH_SERVICE, false)
    yield call(setAuthDetails, AUTH_TOKEN, data)
    yield put({ type: actionKind.success(LOGIN_SN) })
  } catch (error) {
    const {
      response: { status, data },
    } = error

    yield call(removeAuthDetails, AUTH_TOKEN)
    yield call(removeAuthDetails, AUTH_DETAILS_NAME)
    yield call(removeAuthDetails, AUTH_SP)

    if (status === 406 || status === 409) {
      yield put({ type: actionKind.error(`${LOGIN_SN}|${status}`), errorMessage: data.errorMessage })
    }

    yield put({ type: actionKind.error(LOGIN_SN), error })
  }
}

export function* getTokenSaga() {
  try {
    const { data } = yield call(auth, 'user/me', '', true)

    yield call(setAuthDetails, AUTH_DETAILS_NAME, data)
    yield put({ type: actionKind.success(GET_TOKEN), data })
  } catch (error) {
    yield call(removeAuthDetails, AUTH_TOKEN)
    yield call(removeAuthDetails, AUTH_DETAILS_NAME)
    yield put({ type: actionKind.error(GET_TOKEN), error })
  }
}

function setAuthDetails(name, details) {
  localStorage.setItem(name, JSON.stringify(details))
  createCookie(name, JSON.stringify(details), 1)
}

function removeAuthDetails(name) {
  localStorage.removeItem(name)
  deleteCookie(name)
}
