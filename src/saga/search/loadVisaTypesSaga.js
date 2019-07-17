import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_VISA_TYPE_LIST } from '../../action/names/ContentSearchNames'

export function* loadVisaTypesSaga({ countryId, mobile }) {
  try {
    const { data } = yield call(get, `visaTypes/getByCountry?countryId=${countryId}`, false)

    // if (mobile) {
    //   const othersVisaType = data.visaTypes.filter(visaType => visaType.typeName === 'Others')[0]
    //   data.visaTypes = data.visaTypes.filter(visaType => visaType.typeName !== 'Others')
    //   data.visaTypes.push(othersVisaType)
    // }

    yield put({ type: actionKind.success(LOAD_VISA_TYPE_LIST), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_VISA_TYPE_LIST), error })
  }
}
