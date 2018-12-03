import { combineReducers } from 'redux';
import app from './app/reducers';
import settings from './settings/reducers';

const rootReducer = combineReducers({
  app,
  settings,
});

export default rootReducer;
