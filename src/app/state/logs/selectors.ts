import { State } from '@app/state/types'
import { createSelector } from 'reselect'

export const selectLogs = (state: State) => state.logs

export const selectLog = createSelector(
  selectLogs,
  (_: State, timestamp: number) => timestamp,
  (logs = {}, timestamp) => logs[timestamp]
)

export const selectRecentLog = createSelector(
  selectLogs,
  (_: State, method: string) => method,
  (logs = {}, method = '') => {
    return Object.values(logs).find(log => log.method === method) || {}
  }
)
