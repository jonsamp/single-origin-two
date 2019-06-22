import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Log from '../../components/Log'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
import { Log as LogType, Theme } from '../../types'

interface LogDetailProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  timestamp: number
}

class LogDetail extends Component<LogDetailProps> {
  render() {
    const { navigation, theme } = this.props
    const { timestamp } = navigation.state.params

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header title="LogDetail" onBack={navigation.goBack} />
        <Log timestamp={timestamp} />
        <Button
          title="done"
          customStyle={{ paddingBottom: 32, borderRadius: 0 }}
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }
}

export default withNavigation(withTheme(LogDetail) as any)
