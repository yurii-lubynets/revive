import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { UPDATE_USER, FLUSH_STATE } from '../../action/names/UserActionNames'

export function* updateUserSaga({ info }) {
  try {
    const { firstName, lastName, middleName, phone, title } = info
    const { data } = yield call(post, 'revivegrant/updateProfile', {
      firstName,
      lastName,
      middleName,
      phone,
      title,
    })
    yield put({ type: actionKind.success(UPDATE_USER), data })
    yield delay(4000)
    yield put({ type: actionKind.make(FLUSH_STATE) })
  } catch (error) {
    yield put({ type: actionKind.error(UPDATE_USER), error })
  }
}
