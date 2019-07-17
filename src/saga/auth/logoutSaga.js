import { call } from 'redux-saga/effects'

import { AUTH_TOKEN, AUTH_DETAILS_NAME, SURVEY_STATE } from '../../common/constant/LocalStorageConst'
import { deleteCookie } from '../../common/constant/Cookie'

export function* logoutSaga() {
  yield call(removeAuthDetails, AUTH_TOKEN)
  yield call(removeAuthDetails, AUTH_DETAILS_NAME)
  yield call(removeAuthDetails, SURVEY_STATE)
}

function removeAuthDetails(name) {
  localStorage.removeItem(name)
  deleteCookie(name)
}
