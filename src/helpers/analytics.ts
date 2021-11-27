import * as Amplitude from 'expo-analytics-amplitude';

export const events = {
  MENU_VIEWED: 'MENU_VIEWED',
  RECIPE_TAPPED: 'RECIPE_TAPPED',
  RECIPE_SUMMARY_VIEWED: 'RECIPE_SUMMARY_VIEWED',
  LOGS_VIEWED: 'LOGS_VIEWED',
  LOG_TAPPED: 'LOG_TAPPED',
  SETTINGS_VIEWED: 'SETTINGS_VIEWED',
  SETTINGS_CHANGED: 'SETTINGS_CHANGED',
};

export const AMPLITUDE_API_KEY = 'b7b8d9d386e9d6ccf3d6f69e941bbaaf';

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

export const track = ({ event, options }: { event: string; options: any }) => {
  maybeInitialize();

  if (options) {
    Amplitude.logEventWithPropertiesAsync(event, options);
  } else {
    Amplitude.logEventAsync(event);
  }
};
