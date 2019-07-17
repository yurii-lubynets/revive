import { put, call } from 'redux-saga/effects'
import { get } from '../../common/api/index'
import { CHAT_SERVICE } from '../../common/constant/ServiceNameConst'

import * as actionKind from '../../action/names/ActionKind'
import { LOAD_NOTIFICATION_ID } from '../../action/names/ChatActionNames'

export function* getNotificationIdSaga() {
  try {
    const {
      data: { notificationId },
    } = yield call(get, '/getUserNotificationId', CHAT_SERVICE)

    yield put({ type: actionKind.success(LOAD_NOTIFICATION_ID), notificationId })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_NOTIFICATION_ID), error })
  }
}
