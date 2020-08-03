import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Header from '../../components/Header'
import Log from '../../components/Log'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
import { Theme } from '../../types'

interface LogDetailProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  timestamp: number
}

class LogDetail extends Component<LogDetailProps> {
  render() {
    const { navigation, theme } = this.props
    const timestamp =
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.timestamp

    return (
      <>
        <Header
          title="Brew Log"
          onBack={navigation.goBack}
          right={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LogDetailEdit', { timestamp })
              }
              style={{ marginRight: 12 }}
            >
              <Text style={[type.body, { color: theme.foreground, bottom: 2 }]}>
                Rate
              </Text>
            </TouchableOpacity>
          }
        />
        <Log timestamp={timestamp} />
      </>
    )
  }
}

export default withNavigation(withTheme(LogDetail) as any)
