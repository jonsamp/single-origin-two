import { handleActions } from 'redux-actions';
import recipes from 'constants/recipes';
import * as actions from './actions';

const initialState = {
  theme: 'light',
  expertMode: false,
  restoreLastBrew: false,
  ratio: 15,
  bloomDuration: 30,
  reminders: false,
  grinder: false,
  grinderType: 'generic',
  waterTemp: false,
  tempUnit: 'fahrenheit',
  weightUnit: 'grams',
  soundsEnabled: true,
  shareTrackingData: true,
  recipes: Object.values(recipes).reduce(
    (acc, r) => ({ ...acc, [r.id]: true }),
    {}
  ),
};

const reducers = {
  [actions.settingUpdated]: (settings, { payload: { setting, value } }) => ({
    ...settings,
    [setting]: value,
  }),
  [actions.themeUpdated]: (settings, { payload: { theme } }) => ({
    ...settings,
    theme,
  }),
};

export default handleActions(reducers, initialState);
