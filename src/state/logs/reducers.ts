import { handleActions } from 'redux-actions';

import * as actions from './actions';
import { Log, Logs } from './types';

const initialState = {};

const reducers = {
  [actions.logAdded.toString()]: (logs: Logs, { payload: { log } }: { payload: { log: Log } }) => ({
    ...logs,
    [log.timestamp.toString()]: log,
  }),
  [actions.logUpdated.toString()]: (
    logs: Logs,
    { payload: { timestamp, log } }: { payload: { log: Log; timestamp: number } }
  ) => ({
    ...logs,
    [timestamp]: {
      ...logs[timestamp],
      ...log,
    },
  }),
  [actions.logDeleted.toString()]: (
    logs: Logs,
    { payload: { timestamp } }: { payload: { timestamp: number } }
  ) => {
    const updated = { ...logs };
    delete updated[timestamp];
    return updated;
  },
};

export default handleActions(reducers, initialState);
