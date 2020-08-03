import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Text, TextStyle, TouchableOpacity } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'

interface GroupProps {
  title: string
  theme: Theme
  navigation: NavigationScreenProp<any>
  isDarkTheme?: boolean
  onPress?: () => void
}

class Group extends Component<GroupProps> {
  static defaultProps = {
    title: '',
  }

  render() {
    const { title, navigation, theme, isDarkTheme, onPress } = this.props

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
          borderBottomColor: isDarkTheme ? theme.background : theme.grey2,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          if (onPress) {
            return onPress()
          }
          navigation.navigate('SettingsDetail', title as any)
        }}
      >
        <Text style={[type.headline, { color: theme.foreground }] as TextStyle}>
          {title}
        </Text>
        <Feather
          name="chevron-right"
          size={theme.iconSize}
          color={theme.foreground}
          style={{ opacity: 0.65 }}
        />
      </TouchableOpacity>
    )
  }
}

export default withTheme(withNavigation(Group))
