import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { Logs } from './types'

const initialState = {
  1561127475000: {
    timestamp: 1561127475000,
    totalVolume: 340,
    totalBrewTime: 0,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  // 1561766400000: {
  //   timestamp: 1561766400000,
  //   totalVolume: 230,
  //   totalBrewTime: 125,
  //   ratio: 15,
  //   recipeId: 'KalitaWave185',
  // },
}

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
