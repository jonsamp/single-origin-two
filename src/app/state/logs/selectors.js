import { createSelector } from 'reselect'

export const selectLogs = state => state.logs

export const selectLog = createSelector(
  selectLogs,
  (_, timestamp) => timestamp,
  (logs = {}, timestamp) => logs[timestamp]
)

export const selectRecentLog = createSelector(
  selectLogs,
  (_, method) => method,
  (logs = {}, method = '') =>
    Object.values(logs).find(log => log.method === method) || {}
)
