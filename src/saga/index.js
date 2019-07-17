import { fork } from 'redux-saga/effects'

import watchAll from './watchers'

export default function* startSaga() {
  yield fork(watchAll)
}
