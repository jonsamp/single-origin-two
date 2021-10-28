import { createSelector } from 'reselect'
import { State } from '../../state/types'

export const selectLogs = (state: State) => state.logs

export const selectLog = createSelector(
  selectLogs,
  (_: State, timestamp: number) => timestamp,
  (logs = {}, timestamp) => logs[timestamp]
)

export const selectRecentLog = createSelector(
  selectLogs,
  (_: State, recipeId: string) => recipeId,
  (logs = {}, recipeId = '') => {
    return (
      Object.values(logs)
        .sort((a, b) => b.timestamp - a.timestamp)
        .find((log) => log.recipeId === recipeId) || {}
    )
  }
)
