import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import HeaderScrollView from 'react-native-header-scroll-view'
import { connect } from 'react-redux'
import withTheme from '../../providers/theme'
import { selectLogs } from '../../state/logs/selectors'
import { Log, Logs as LogsType, Theme } from '../../types/index'
import LogListItem from './LogListItem'

interface LogsProps {
  theme: Theme
  logs: LogsType
  isDarkTheme: boolean
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

class Logs extends Component<LogsProps> {
  byTimestamp = (a, b) => b.timestamp - a.timestamp
  render() {
    const { theme, logs, isDarkTheme } = this.props
    if (!logs || Object.keys(logs).length === 0) {
      return <View />
    }
    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <HeaderScrollView
          title="Logs"
          containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
          headerComponentContainerStyle={{
            backgroundColor: modifiedTheme.grey2,
          }}
          headerComponentStyle={{
            backgroundColor: modifiedTheme.grey1,
          }}
          headlineStyle={{ color: modifiedTheme.foreground }}
          titleStyle={{
            color: modifiedTheme.foreground,
            marginBottom: 24,
          }}
          scrollContainerStyle={{
            backgroundColor: modifiedTheme.grey1,
            paddingBottom: 32,
          }}
          fadeDirection="up"
        >
          <FlatList
            data={Object.values(logs).sort(this.byTimestamp)}
            extraData={this.state}
            keyExtractor={(item: Log) => String(item.timestamp)}
            renderItem={props => <LogListItem {...props} />}
          />
        </HeaderScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(Logs))
