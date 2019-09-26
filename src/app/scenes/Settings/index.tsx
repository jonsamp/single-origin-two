import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import HeaderScrollView from 'react-native-header-scroll-view'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import withTheme from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { Theme } from '../../types/index'
import Group from './Group'
import Section from './Section'
import SettingWrapper from './SettingWrapper'

interface SettingsProps {
  theme: Theme
  isDarkTheme: boolean
  navigation: NavigationScreenProp<any>
  tracking: Tracking
}

class Settings extends Component<SettingsProps> {
  focusListener

  componentDidMount() {
    const { navigation, tracking } = this.props
    this.focusListener = navigation.addListener('didFocus', () => {
      tracking.track(tracking.events.SETTINGS_VIEWED)
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  render() {
    const { theme, isDarkTheme } = this.props

    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    return (
      <HeaderScrollView
        title="Settings"
        containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
        headerComponentContainerStyle={{
          backgroundColor: isDarkTheme ? modifiedTheme.grey2 : theme.background,
        }}
        headerComponentStyle={{
          backgroundColor: modifiedTheme.grey1,
        }}
        headlineStyle={{ color: modifiedTheme.foreground }}
        titleStyle={{
          color: modifiedTheme.foreground,
          marginBottom: -8,
          marginLeft: 12,
        }}
        scrollContainerStyle={{
          backgroundColor: modifiedTheme.grey1,
          paddingBottom: 32,
        }}
        fadeDirection="up"
      >
        <Section title="Brewing">
          <Group title="Brew Settings" />
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
                'https://itunes.apple.com/app/id1480168613?action=write-review'
              )
            }
          >
            <SettingWrapper title="Rate Single Origin 2">
              <Feather
                name="star"
                size={modifiedTheme.iconSize}
                color={modifiedTheme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity>
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
          <Group title="Privacy Policy" />
        </Section>
      </HeaderScrollView>
    )
  }
}

export default withNavigation(withTracking(withTheme(Settings)) as any)
