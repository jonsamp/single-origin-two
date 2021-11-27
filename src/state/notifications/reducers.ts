import { handleActions } from 'redux-actions';

import * as actions from './actions';
import { Notifications } from './types';

const initialState = {
  status: '',
};

const reducers = {
  [actions.notificationsReset]: (notifications: Notifications) => initialState,
  [actions.reminderDenied]: (notifications: Notifications) => ({
    ...notifications,
    status: 'denied',
  }),
};

export default handleActions(reducers, initialState);
