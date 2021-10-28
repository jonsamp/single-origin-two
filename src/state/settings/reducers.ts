import { handleActions } from 'redux-actions'
import recipes from '../../constants/recipes'
import * as actions from './actions'
import { Settings } from './types'

const initialState = {
  theme: 'light',
  ratio: 16,
  bloomDuration: 30,
  recordTemp: true,
  recordGrind: true,
  grinderType: 'generic',
  temperatureUnit: 'fahrenheit',
  brewedVolumeUnit: 'ounces',
  coffeeWeightUnit: 'grams',
  waterVolumeUnit: 'grams',
  shareTrackingData: true,
  onboardingVisible: true,
  submittedRating: false,
  autoTheme: false,
  recipes: Object.values(recipes).reduce(
    (acc, r) => ({ ...acc, [r.id]: true }),
    {}
  ),
}

const reducers = {
  [actions.settingUpdated]: (
    settings: Settings,
    { payload: { setting, value } }
  ) => ({
    ...settings,
    [setting]: value,
  }),
  [actions.themeUpdated]: (settings: Settings, { payload: { theme } }) => ({
    ...settings,
    theme,
  }),
  [actions.autoThemeUpdated]: (
    settings: Settings,
    { payload: { autoTheme } }
  ) => ({
    ...settings,
    autoTheme,
  }),
}

export default handleActions(reducers, initialState)
