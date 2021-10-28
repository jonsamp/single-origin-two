import { all, call } from 'redux-saga/effects'
import notificationsSagas from './notifications/sagas'
import trackingSagas from './tracking/sagas'

export default function* rootSaga() {
  yield all([call(notificationsSagas), call(trackingSagas)])
}
