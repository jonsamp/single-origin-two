import type from '@app/constants/type'
import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Text, TextStyle, TouchableOpacity } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'

interface GroupProps {
  title: string
  theme: Theme
  navigation: NavigationScreenProp<any>
  isDarkTheme?: boolean
}

class Group extends Component<GroupProps> {
  static defaultProps = {
    title: '',
  }

  render() {
    const { title, navigation, theme, isDarkTheme } = this.props

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
        onPress={() => navigation.navigate('SettingsDetail', title as any)}
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
