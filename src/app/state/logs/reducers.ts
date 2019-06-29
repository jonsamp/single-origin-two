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
  1559530000000: {
    timestamp: 1559530000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1559550000000: {
    timestamp: 1559550000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1559570000000: {
    timestamp: 1559570000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1559590000000: {
    timestamp: 1559590000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1558590000000: {
    timestamp: 1558590000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1557590000000: {
    timestamp: 1557590000000,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1556590000000: {
    timestamp: 1556590000000,
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
  [actions.logUpdated]: (logs: Logs, { payload: { timestamp, log } }) => ({
    ...logs,
    [timestamp]: {
      ...logs[timestamp],
      ...log,
    },
  }),
  [actions.logDeleted]: (logs: Logs, { payload: { log } }) => ({
    [log.timestamp]: undefined,
    ...logs,
  }),
}

export default handleActions(reducers, initialState)
