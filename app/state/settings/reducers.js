import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  theme: 'light',
};

const reducers = {
  [actions.themeUpdated]: (settings, { payload: { theme } }) => ({
    ...settings,
    theme,
  }),
};

export default handleActions(reducers, initialState);
