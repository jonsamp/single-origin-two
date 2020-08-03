import React, { Component } from 'react'
import { FlatList, View, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withTheme from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
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
  navigation: NavigationScreenProp<any>
  tracking: Tracking
}

interface LogsState {
  editing: boolean
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

const mapDispatchToProps = { logDeleted }

class Logs extends Component<LogsProps, LogsState> {
  state = { editing: false }

  componentDidMount() {
    const { navigation, tracking } = this.props
    navigation.addListener('focus', () => {
      tracking.track(tracking.events.LOGS_VIEWED)
    })
  }

  toggleEditing = () => this.setState(prev => ({ editing: !prev.editing }))

  byTimestamp = (a, b) => b.timestamp - a.timestamp

  render() {
    const { theme, logs, isDarkTheme, logDeleted, navigation } = this.props
    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    return logs && Object.keys(logs).length > 0 ? (
      <FlatList
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
                backgroundColor: isDarkTheme ? theme.background : theme.grey1,
              },
            ]}
          />
        )}
      />
    ) : (
      <ScreenPlaceholder text="Logs of your brews will appear here once you complete a brew." />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTracking(withTheme(Logs)))
