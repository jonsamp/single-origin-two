import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { Logs } from './types'

const initialState = {}

const reducers = {
  [actions.logAdded]: (logs: Logs, { payload: { log } }) => ({
    [log.timestamp]: log,
    ...logs,
  }),
  [actions.logDeleted]: (logs: Logs, { payload: { log } }) => ({
    [log.timestamp]: undefined,
    ...logs,
  }),
}

export default handleActions(reducers, initialState)
