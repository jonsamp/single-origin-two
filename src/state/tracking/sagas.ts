import * as Amplitude from 'expo-analytics-amplitude'
import Constants from 'expo-constants'
import { takeEvery } from 'redux-saga/effects'
import { Platform } from 'react-native'
import { eventTracked } from './actions'

let isInitialized = false
const { manifest } = Constants
const apiKey = manifest.extra && manifest.extra.amplitudeApiKey

const initialize = () => {
  if (!apiKey) {
    return
  }

  Amplitude.initialize(apiKey)
  isInitialized = true
}

const maybeInitialize = () => {
  if (apiKey && !isInitialized) {
    initialize()
  }
}

function* handleEventTracked(action) {
  const { event, options } = action.payload

  maybeInitialize()

  if (options) {
    Amplitude.logEventWithProperties(event, {
      ...options,
      platform: Platform.OS,
    })
  } else {
    Amplitude.logEvent(event)
  }
}

export default function* rootSaga() {
  yield takeEvery(eventTracked, handleEventTracked)
}
