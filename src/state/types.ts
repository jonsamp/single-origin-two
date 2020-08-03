import { Logs } from './logs/types'
import { Notifications } from './notifications/types'
import { Settings } from './settings/types'

export interface State {
  logs: Logs
  notifications: Notifications
  settings: Settings
}
