import * as Amplitude from 'expo-analytics-amplitude';
import { Platform } from 'react-native';
import { Action } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';

import { AMPLITUDE_API_KEY } from '../../helpers/analytics';
import { eventTracked } from './actions';

let isInitialized = false;
const apiKey = AMPLITUDE_API_KEY;

const initialize = async () => {
  if (!apiKey) {
    return;
  }

  await Amplitude.initializeAsync(apiKey);
  isInitialized = true;
};

const maybeInitialize = () => {
  if (apiKey && !isInitialized) {
    initialize();
  }
};

function* handleEventTracked(action: Action<any>) {
  const { event, options } = action.payload;

  maybeInitialize();

  if (options) {
    Amplitude.logEventWithPropertiesAsync(event, {
      ...options,
      platform: Platform.OS,
    });
  } else {
    Amplitude.logEventAsync(event);
  }
}

export default function* rootSaga() {
  yield takeEvery(eventTracked, handleEventTracked);
}
