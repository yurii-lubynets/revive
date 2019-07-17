import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
// import { post, get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { ADD_SP_LICENSE, LOAD_SP_LICENSE, DELETE_SP_LICENSE } from '../../action/names/UserActionNames'

export function* loadSPLicenseSaga() {
  try {
    // const { data } = yield call(get, 'provider/getEducations/', false)
    const data = [
      {
        year: 2008,
        country: 'USA',
        state: 'NY',
        id: 1,
      },
      {
        year: 20010,
        country: 'USA',
        state: 'NJ',
        id: 2,
      },
      {
        year: 2012,
        country: 'Canada',
        state: 'Test',
        id: 3,
      },
    ]
    yield put({ type: actionKind.success(LOAD_SP_LICENSE), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_LICENSE) })
  }
}

export function* addSPLicenseSaga({ license, resetForm }) {
  try {
    // const { year, ...rest } = license
    // const data = {
    //   year: parseInt(year),
    //   ...rest,
    // }
    // yield call(post, 'provider/addEducation', data)
    yield put({ type: actionKind.success(ADD_SP_LICENSE) })
    yield delay(1000)
    yield call(resetForm)
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_LICENSE) })
  }
}

export function* removeSPLicenseSaga({ id }) {
  try {
    // yield call(get, `provider/removeEducation/${id}`, false)
    yield put({ type: actionKind.success(DELETE_SP_LICENSE) })
  } catch (error) {
    yield put({ type: actionKind.error(DELETE_SP_LICENSE) })
  }
}
