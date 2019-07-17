import { put, call } from 'redux-saga/effects'
import { post, get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_LANGUAGES } from '../../action/names/ContentSearchNames'
import { ADD_SP_LANGUAGES, LOAD_SP_LANGUAGES } from '../../action/names/UserActionNames'

export function* loadSPLanguagesSaga() {
  try {
    const { data } = yield call(get, 'provider/getLanguages', false)
    yield put({ type: actionKind.success(LOAD_SP_LANGUAGES), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_LANGUAGES) })
  }
}

export function* loadLanguagesSaga() {
  try {
    const { data } = yield call(get, 'dictionaries/languages', false)
    yield put({ type: actionKind.success(LOAD_LANGUAGES), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_LANGUAGES) })
  }
}

export function* addLanguagesSaga({ list }) {
  try {
    const languagesIds = []
    list.map(item => languagesIds.push(item.id))
    yield call(post, 'provider/addLanguages', {
      languagesIds,
    })
    yield put({ type: actionKind.success(ADD_SP_LANGUAGES) })
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_LANGUAGES) })
  }
}
