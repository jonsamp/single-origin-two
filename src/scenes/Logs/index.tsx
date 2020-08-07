import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withTheme from '../../providers/theme'
import { logDeleted } from '../../state/logs/actions'
import { selectLogs } from '../../state/logs/selectors'
import { Logs as LogsType, Theme } from '../../types/index'
import LogItem from './LogItem'
import styles from './styles'

interface LogsProps {
  theme: Theme
  logs: LogsType
  isDarkTheme: boolean
  logDeleted: (props: { timestamp: number }) => void
  navigation: any
}

interface LogsState {
  editing: boolean
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

const mapDispatchToProps = { logDeleted }

class Logs extends Component<LogsProps, LogsState> {
  byTimestamp = (a, b) => b.timestamp - a.timestamp

  render() {
    const { theme, logs, logDeleted, navigation } = this.props

    return (
      <FlatList
        contentContainerStyle={{ paddingTop: 16 }}
        data={Object.values(logs)
          .filter(log => log && recipes[log.recipeId])
          .sort(this.byTimestamp)}
        keyExtractor={log => String(log.timestamp)}
        renderItem={({ item }) => (
          <LogItem
            log={item}
            onPress={() =>
              navigation.navigate('LogDetail', {
                timestamp: item.timestamp,
              })
            }
            onRightPress={() => logDeleted({ timestamp: item.timestamp })}
          />
        )}
        extraData={this.state}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.separator,
              {
                backgroundColor: theme.border,
              },
            ]}
          />
        )}
        ListEmptyComponent={
          <ScreenPlaceholder text="Notes of each brew will appear here once you complete a brew." />
        }
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Logs))
