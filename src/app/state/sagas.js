import { call, all } from 'redux-saga/effects';
import settingsSagas from './settings/sagas';

export default function* rootSaga() {
  yield all([call(settingsSagas)]);
}
