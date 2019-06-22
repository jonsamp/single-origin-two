import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { Logs } from './types'

const initialState = {
  1561214087191: {
    timestamp: 1561214087191,
    totalVolume: 340,
    totalBrewTime: 0,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1531214087200: {
    timestamp: 1531214087200,
    totalVolume: 230,
    totalBrewTime: 125,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1501214067200: {
    timestamp: 1501214067200,
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
