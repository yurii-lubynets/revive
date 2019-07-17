import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { post, get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { ADD_SP_EDUCATION, LOAD_SP_EDUCATION, DELETE_SP_EDUCATION } from '../../action/names/UserActionNames'

export function* loadSPEducationSaga() {
  try {
    const { data } = yield call(get, 'provider/getEducations/', false)
    yield put({ type: actionKind.success(LOAD_SP_EDUCATION), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_EDUCATION) })
  }
}

export function* addSPEducationSaga({ education, resetForm }) {
  try {
    const { graduationYear, countryId, educationInstitution, major, title } = education
    const data = {
      countryId: countryId || 249,
      educationInstitution,
      graduationYear: parseInt(graduationYear),
      major,
      title,
    }
    yield call(post, 'provider/addEducation', data)
    yield put({ type: actionKind.success(ADD_SP_EDUCATION) })
    yield delay(1000)
    yield call(resetForm)
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_EDUCATION) })
  }
}

export function* removeSPEducationSaga({ id }) {
  try {
    yield call(get, `provider/removeEducation/${id}`, false)
    yield put({ type: actionKind.success(DELETE_SP_EDUCATION) })
  } catch (error) {
    yield put({ type: actionKind.error(DELETE_SP_EDUCATION) })
  }
}
