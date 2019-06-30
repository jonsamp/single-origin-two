import { call, all } from 'redux-saga/effects'
import notificationsSagas from './notifications/sagas'

export default function* rootSaga() {
  yield all([call(notificationsSagas)])
}
