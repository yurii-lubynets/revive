import { put } from 'redux-saga/effects'

import { CHANGE_LOCALE } from '../../action/names/LocaleNames'
import { LOCALE_NAME } from '../../common/constant/LocalStorageConst'
import * as actionKind from '../../action/names/ActionKind'

export function* localeSaga({ locale }) {
  try {
    yield localStorage.setItem(LOCALE_NAME, locale)
  } catch (error) {
    yield put({ type: actionKind.error(CHANGE_LOCALE), error })
  }
}
