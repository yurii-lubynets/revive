import { call } from 'redux-saga/effects'
import { post } from '../../common/api/index'
import { AUTH_SERVICE } from '../../common/constant/ServiceNameConst'

import { AUTH_TOKEN } from '../../common/constant/LocalStorageConst'
import { createCookie, readCookie } from '../../common/constant/Cookie'

export function* refreshSaga() {
  try {
    const data = yield call(loadLocalDetails, AUTH_TOKEN)
    const {
      data: { accessToken },
    } = yield call(post, '/tokenRefresh', { refresh_token: data.refresh_token }, AUTH_SERVICE, true)
    yield call(setAuthDetails, AUTH_TOKEN, { ...data, access_token: accessToken })
  } catch (error) {
    yield console.log(error)
  }
}

function loadLocalDetails(name) {
  return JSON.parse(localStorage.getItem(name)) || readCookie(name) || ''
}

function setAuthDetails(name, details) {
  localStorage.setItem(name, JSON.stringify(details))
  createCookie(name, JSON.stringify(details), 1)
}
