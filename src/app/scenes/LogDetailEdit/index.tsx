import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
import { Theme } from '../../types'

interface LogDetailEditProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  timestamp: number
  isDarkTheme: boolean
}

class LogDetailEdit extends Component<LogDetailEditProps, LogDetailEditState> {
  render() {
    const { navigation, theme, isDarkTheme } = this.props
    const { timestamp } = navigation.state.params

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
      >
        <Text style={type.header}>Update Log</Text>
        <Text style={type.header}>{timestamp}</Text>
        <Button onPress={() => navigation.goBack()} title="Done" />
      </View>
    )
  }
}

export default withNavigation(withTheme(LogDetailEdit) as any)
