import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'
import Calendar from './Calendar'

interface LogsProps {
  theme: Theme
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

class Logs extends Component<LogsProps> {
  static propTypes = {}

  state = {}

  render() {
    const { theme } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView>
          <Calendar />
        </ScrollView>
      </View>
    )
  }
}

export default withTheme(Logs)