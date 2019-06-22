import { createSelector } from 'reselect'
import { State } from '../../state/types'

export const selectLogs = (state: State) => state.logs

export const selectLog = createSelector(
  selectLogs,
  (_: State, timestamp: number) => timestamp,
  (logs = {}, timestamp) => logs[timestamp]
)

export const selectLogsDates = createSelector(selectLogs, (logs = {}) => {
  return Object.values(logs).map(log => {
    const date = new Date(log.timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  })
})

export const selectRecentLog = createSelector(
  selectLogs,
  (_: State, method: string) => method,
  (logs = {}, method = '') => {
    return Object.values(logs).find(log => log.method === method) || {}
  }
)
