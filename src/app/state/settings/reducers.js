import { handleActions } from 'redux-actions'
import recipes from '@app/constants/recipes'
import * as actions from './actions'

const initialState = {
  theme: 'light',
  restoreLastBrew: false,
  ratio: 15,
  bloomDuration: 30,
  reminders: false,
  recordTemp: true,
  recordGrind: true,
  grinderType: 'generic',
  temperatureUnit: 'fahrenheit',
  brewedVolumeUnit: 'ounces',
  coffeeWeightUnit: 'grams',
  waterVolumeUnit: 'grams',
  soundsEnabled: true,
  shareTrackingData: true,
  recipes: Object.values(recipes).reduce(
    (acc, r) => ({ ...acc, [r.id]: true }),
    {}
  ),
}

const reducers = {
  [actions.settingUpdated]: (settings, { payload: { setting, value } }) => ({
    ...settings,
    [setting]: value,
  }),
  [actions.themeUpdated]: (settings, { payload: { theme } }) => ({
    ...settings,
    theme,
  }),
}

export default handleActions(reducers, initialState)