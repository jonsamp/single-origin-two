import { combineReducers } from 'redux'
import logs from './logs/reducers'
import settings from './settings/reducers'

const rootReducer = combineReducers({
  logs,
  settings,
})

export default rootReducer
