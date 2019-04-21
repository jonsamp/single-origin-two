import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Feather } from '@expo/vector-icons'
import withTheme from '@app/providers/theme'
import type from '@app/constants/type'

class Group extends Component {
  static propTypes = {
    title: PropTypes.string,
    theme: PropTypes.object,
    navigation: PropTypes.object,
    isDarkTheme: PropTypes.bool,
  }

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
        onPress={() => navigation.navigate('SettingsDetail', title)}
      >
        <Text style={[type.headline, { color: theme.foreground }]}>
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

export default withNavigation(withTheme(Group))
