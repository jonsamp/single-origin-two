import React, { Component } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import withTheme from '../../providers/theme'
import { selectLogs } from '../../state/logs/selectors'
import { Log, Logs as LogsType, Theme } from '../../types/index'
import Calendar from './Calendar'
import LogListItem from './LogListItem'

interface LogsProps {
  theme: Theme
  logs: LogsType
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

const mapDispatchToProps = {}

class Logs extends Component<LogsProps> {
  state = {}

  render() {
    const { theme, logs } = this.props
    if (!logs || Object.keys(logs).length === 0) {
      return <View />
    }

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Calendar />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <FlatList
            data={Object.values(logs)}
            extraData={this.state}
            keyExtractor={(item: Log) => String(item.timestamp)}
            renderItem={props => <LogListItem {...props} />}
          />
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(Logs))
