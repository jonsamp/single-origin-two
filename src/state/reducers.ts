import { combineReducers } from 'redux'
import logs from './logs/reducers'
import notifications from './notifications/reducers'
import settings from './settings/reducers'

const rootReducer = combineReducers({
  logs,
  notifications,
  settings,
})

export default rootReducer
