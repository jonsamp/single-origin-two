import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withTheme from '@app/providers/theme'
import HeaderScrollView from 'react-native-header-scroll-view'
import { TouchableOpacity, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Section from './Section'
import Group from './Group'
import SettingWrapper from './SettingWrapper'

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    isDarkTheme: PropTypes.bool,
  }

  render() {
    const { theme, isDarkTheme, ...rest } = this.props

    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey1,
        }
      : theme

    return (
      <HeaderScrollView
        title="Settings"
        containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
        headerComponentContainerStyle={{
          backgroundColor: modifiedTheme.grey1,
          borderBottomWidth: 1,
          borderBottomColor: modifiedTheme.grey2,
        }}
        headerComponentStyle={{
          backgroundColor: modifiedTheme.grey1,
        }}
        headlineStyle={{ color: modifiedTheme.foreground }}
        titleStyle={{
          color: modifiedTheme.foreground,
          marginBottom: 0,
        }}
        scrollContainerStyle={{
          backgroundColor: modifiedTheme.grey1,
          paddingBottom: 32,
        }}
        fadeDirection="up"
      >
        <Section title="Brewing">
          <Group title="Brew settings" />
          <Group title="Grinder" />
          <Group title="Units" />
          <Group title="Recipes" />
        </Section>
        <Section title="General">
          <Group title="App" />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'mailto:sampjon@gmail.com?subject=Single%20Origin%20Feedback'
              )
            }
          >
            <SettingWrapper title="Send feedback">
              <Feather
                name="mail"
                size={modifiedTheme.iconSize}
                color={modifiedTheme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://itunes.apple.com/us/app/appName/id1316843624?mt=8&action=write-review'
              )
            }
          >
            <SettingWrapper title="Rate Single Origin">
              <Feather
                name="star"
                size={modifiedTheme.iconSize}
                color={modifiedTheme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity>
          <Group title="Privacy policy" />
          <TouchableOpacity
            onPress={() => Linking.openURL('http://mbox.coffee/OGCC')}
          >
            <SettingWrapper title="$10 off Mistobox">
              <Feather
                name="external-link"
                size={modifiedTheme.iconSize}
                color={modifiedTheme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity>
        </Section>
      </HeaderScrollView>
    )
  }
}

export default withTheme(Settings)
