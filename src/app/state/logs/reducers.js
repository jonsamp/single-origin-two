import { handleActions } from 'redux-actions'
import * as actions from './actions'

const initialState = {}

const reducers = {
  [actions.logAdded]: (logs, { payload: { log } }) => ({
    [log.timestamp]: log,
    ...logs,
  }),
  [actions.logDeleted]: (logs, { payload: { log } }) => ({
    [log.timestamp]: undefined,
    ...logs,
  }),
}

export default handleActions(reducers, initialState)
