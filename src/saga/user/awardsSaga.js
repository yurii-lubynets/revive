import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
// import { get, post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { ADD_SP_AWARDS, LOAD_SP_AWARDS, DELETE_SP_AWARDS } from '../../action/names/UserActionNames'

export function* addAwardsSaga({ award, resetForm }) {
  try {
    // const { year, ...rest } = award
    // const data = {
    //   year: parseInt(year),
    //   ...rest,
    // }
    // yield call(post, '/addAwards', {})
    yield put({ type: actionKind.success(ADD_SP_AWARDS) })
    yield delay(1000)
    yield call(resetForm)
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_AWARDS) })
  }
}

export function* loadAwardsSaga() {
  try {
    // yield call(get, '/awards', false)
    const data = [
      {
        award: 'Pro Bono Service Commendation',
        from: 'Washington State Bar Association',
        year: '2015',
      },
      {
        award: 'Pro Bono Service Commendation',
        from: 'Washington State Bar Association',
        year: '2015',
      },
    ]
    yield put({ type: actionKind.success(LOAD_SP_AWARDS), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_AWARDS) })
  }
}

export function* removeSPAwardsSaga({ id }) {
  try {
    // yield call(get, `provider/removeEducation/${id}`, false)
    yield put({ type: actionKind.success(DELETE_SP_AWARDS) })
  } catch (error) {
    yield put({ type: actionKind.error(DELETE_SP_AWARDS) })
  }
}
