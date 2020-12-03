import { Amplitude, Constants } from 'expo'

export const events = {
  MENU_VIEWED: 'MENU_VIEWED',
  RECIPE_TAPPED: 'RECIPE_TAPPED',
  RECIPE_SUMMARY_VIEWED: 'RECIPE_SUMMARY_VIEWED',
  LOGS_VIEWED: 'LOGS_VIEWED',
  LOG_TAPPED: 'LOG_TAPPED',
  SETTINGS_VIEWED: 'SETTINGS_VIEWED',
  SETTINGS_CHANGED: 'SETTINGS_CHANGED',
}

let isInitialized = false
const { manifest } = Constants
const apiKey = manifest.extra && manifest.extra.amplitudeApiKey

const initialize = async () => {
  if (!apiKey) {
    return
  }

  await Amplitude.initializeAsync(apiKey)
  isInitialized = true
}

const maybeInitialize = () => {
  if (apiKey && !isInitialized) {
    initialize()
  }
}

export const track = ({ event, options }) => {
  maybeInitialize()

  if (options) {
    Amplitude.logEventWithPropertiesAsync(event, options)
  } else {
    Amplitude.logEvent(event)
  }
}
