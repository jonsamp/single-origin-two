import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withTheme from '../../providers/theme'
import { selectLogs } from '../../state/logs/selectors'
import { Logs as LogsType, Theme } from '../../types/index'
import LogItem from './LogItem'
import styles from './styles'

interface LogsProps {
  theme: Theme
  logs: LogsType
  isDarkTheme: boolean
  navigation: any
}

interface LogsState {
  editing: boolean
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

class Logs extends Component<LogsProps, LogsState> {
  byTimestamp = (a, b) => b.timestamp - a.timestamp

  render() {
    const { theme, logs, navigation } = this.props

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

export default connect(mapStateToProps)(withTheme(Logs))
