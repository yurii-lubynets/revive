import { put, call } from 'redux-saga/effects'
import { get, post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_COUNTRIES } from '../../action/names/ContentSearchNames'
import { ADD_SP_COUNTRIES, LOAD_SP_COUNTRIES } from '../../action/names/UserActionNames'

export function* loadSPCountriesSaga() {
  try {
    const { data } = yield call(get, 'provider/getCountries', false)
    yield put({ type: actionKind.success(LOAD_SP_COUNTRIES), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_COUNTRIES) })
  }
}

export function* addCountriesSaga({ list }) {
  try {
    const countriesIds = []
    list.map(item => countriesIds.push(item.id))
    yield call(post, 'provider/addCountries', {
      countriesIds,
    })
    yield put({ type: actionKind.success(ADD_SP_COUNTRIES) })
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_COUNTRIES) })
  }
}

export function* loadCountriesSaga() {
  try {
    const { data } = yield call(get, 'dictionaries/countries', false)
    yield put({ type: actionKind.success(LOAD_COUNTRIES), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_COUNTRIES) })
  }
}
