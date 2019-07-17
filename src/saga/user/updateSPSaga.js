import { put, call } from 'redux-saga/effects'
import { post } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { UPDATE_SP } from '../../action/names/UserActionNames'

export function* updateSPSaga({ info }) {
  try {
    console.log(info)
    const data = {
      providerName: 'revive Net 1',
      providerFirstName: 'revive Net 1',
      providerLastName: 'revive Net 1',
      gender: 'F',
      countryId: 249,
      providerTypeId: 1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      aboutMe:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }
    yield call(post, 'provider/updateProviderProfile', data)
    yield put({ type: actionKind.success(UPDATE_SP) })
  } catch (error) {
    yield put({ type: actionKind.error(UPDATE_SP) })
  }
}
