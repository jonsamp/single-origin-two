import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { Logs } from './types'

const initialState = {}

const reducers = {
  [actions.logAdded]: (logs: Logs, { payload: { log } }) => ({
    ...logs,
    [log.timestamp]: log,
  }),
  [actions.logUpdated]: (logs: Logs, { payload: { timestamp, log } }) => ({
    ...logs,
    [timestamp]: {
      ...logs[timestamp],
      ...log,
    },
  }),
  [actions.logDeleted]: (logs: Logs, { payload: { timestamp } }) => {
    const updated = { ...logs }
    delete updated[timestamp]
    return updated
  },
}

export default handleActions(reducers, initialState)
