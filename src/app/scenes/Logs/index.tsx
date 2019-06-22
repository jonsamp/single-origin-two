import React, { Component } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import withTheme from '../../providers/theme'
import { Log, Logs as LogsType, Theme } from '../../types/index'
import Calendar from './Calendar'
import LogListItem from './LogListItem'

const mockLogs = {
  1561214087191: {
    timestamp: 1561214087191,
    totalVolume: 340,
    totalBrewTime: 0,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1561214087200: {
    timestamp: 1561214087200,
    totalVolume: 230,
    totalBrewTime: 125,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
  1561214067200: {
    timestamp: 1561214067200,
    totalVolume: 330,
    totalBrewTime: 145,
    ratio: 15,
    recipeId: 'KalitaWave185',
  },
}

interface LogsProps {
  theme: Theme
  logs: LogsType
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

class Logs extends Component<LogsProps> {
  static defaultProps = {
    logs: mockLogs,
  }

  state = {}

  render() {
    const { theme, logs } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Calendar />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <FlatList
            data={Object.values(logs)}
            extraData={this.state}
            keyExtractor={(item: Log) => String(item.timestamp)}
            renderItem={props => <LogListItem log={props.item} />}
          />
        </ScrollView>
      </View>
    )
  }
}

export default withTheme(Logs)
