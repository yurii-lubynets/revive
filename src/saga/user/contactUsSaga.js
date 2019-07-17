import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { CONTACT_US, FLUSH_STATE } from '../../action/names/UserActionNames'

export function* contactUsSaga({ mail, resetForm }) {
  try {
    const { content, email, fullName, phone, subject } = mail
    yield call(post, 'support/contactUs', {
      fullName,
      phoneNumber: phone,
      subject,
      email,
      message: content,
    })
    yield put({ type: actionKind.success(CONTACT_US) })
    yield delay(4000)
    yield call(resetForm)
    yield put({ type: actionKind.make(FLUSH_STATE) })
  } catch (error) {
    yield put({ type: actionKind.error(CONTACT_US), error })
  }
}
