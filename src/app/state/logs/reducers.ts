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
  1561766400000: {
    timestamp: 1561766400000,
    totalVolume: 230,
    totalBrewTime: 125,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1559520000000: {
    timestamp: 1559520000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
}

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
