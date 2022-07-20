import { handleActions } from 'redux-actions';

import { recipes } from '../../constants/recipes';
import * as actions from './actions';
import { Settings, WeightUnits, TemperatureUnits } from './types';

const initialState = {
  ratio: 16,
  bloomDuration: 30,
  recordTemp: true,
  recordGrind: true,
  grinderType: 'generic',
  temperatureUnit: TemperatureUnits.Fahrenheit,
  brewedVolumeUnit: WeightUnits.Ounces,
  coffeeWeightUnit: WeightUnits.Grams,
  waterVolumeUnit: WeightUnits.Grams,
  onboardingVisible: true,
  submittedRating: false,
  recipes: Object.values(recipes).reduce((acc, r) => ({ ...acc, [r.id]: true }), {}),
};

const reducers = {
  [actions.settingUpdated.toString()]: (
    settings: Settings,
    { payload: { key, value } }: { payload: { key: keyof Settings; value: any } }
  ) => ({
    ...settings,
    [key]: value,
  }),
};

export default handleActions(reducers, initialState);
