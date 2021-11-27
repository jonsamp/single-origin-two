import { handleActions } from 'redux-actions';

import * as actions from './actions';
import { Notifications } from './types';

const initialState = {
  status: '',
};

const reducers = {
  [actions.notificationsReset.toString()]: (_: Notifications) => initialState,
  [actions.reminderDenied.toString()]: (notifications: Notifications) => ({
    ...notifications,
    status: 'denied',
  }),
};

export default handleActions(reducers, initialState);
