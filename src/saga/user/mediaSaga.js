import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
// import { get, post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { ADD_SP_MEDIA, LOAD_SP_MEDIA, DELETE_SP_MEDIA } from '../../action/names/UserActionNames'

export function* addMediaSaga({ media, resetForm }) {
  try {
    // const { year, ...rest } = award
    // const data = {
    //   year: parseInt(year),
    //   ...rest,
    // }
    // yield call(post, '/addMedia', {})
    yield put({ type: actionKind.success(ADD_SP_MEDIA) })
    yield delay(1000)
    yield call(resetForm)
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_MEDIA) })
  }
}

export function* loadMediaSaga() {
  try {
    // yield call(get, '/awards', false)
    const data = [
      {
        link: 'https://www.facebook.com/revive-Net-257682058490808/',
        state: 'Professional Facebook page',
        id: 1,
      },
      {
        link: 'https://www.linkedin.com/company/18562244',
        state: 'LinkedIn',
        id: 2,
      },
    ]
    yield put({ type: actionKind.success(LOAD_SP_MEDIA), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_MEDIA) })
  }
}

export function* removeMediaSaga({ id }) {
  try {
    // yield call(get, `provider/removeEducation/${id}`, false)
    yield put({ type: actionKind.success(DELETE_SP_MEDIA) })
  } catch (error) {
    yield put({ type: actionKind.error(DELETE_SP_MEDIA) })
  }
}
