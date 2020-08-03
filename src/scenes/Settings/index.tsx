import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Linking, TouchableOpacity, ScrollView } from 'react-native'
import withTheme from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { Theme } from '../../types/index'
import Group from './Group'
import Section from './Section'
import SettingWrapper from './SettingWrapper'

interface SettingsProps {
  theme: Theme
  isDarkTheme: boolean
  navigation: any
  tracking: Tracking
}

class Settings extends Component<SettingsProps> {
  focusListener

  componentDidMount() {
    const { navigation, tracking } = this.props
    navigation.addListener('focus', () => {
      tracking.track(tracking.events.SETTINGS_VIEWED)
    })
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
      <ScrollView>
        <Section title="Brewing">
          <Group title="Brew Settings" />
          <Group title="Grinder" />
          <Group title="Units" />
          <Group title="Recipes" />
        </Section>
        <Section title="General">
          <Group title="App" />
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
      </ScrollView>
    )
  }
}

export default withTracking(withTheme(Settings))
