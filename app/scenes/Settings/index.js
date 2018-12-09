import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import HeaderScrollView from 'react-native-header-scroll-view';
import Section from './Section';
import Group from './Group';
import SwitchSetting from './SwitchSetting';

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    isDarkTheme: PropTypes.bool,
    settings: PropTypes.object,
    settingUpdated: PropTypes.func,
    toggleTheme: PropTypes.func,
  };

  state = {};

  render() {
    const {
      theme,
      toggleTheme,
      isDarkTheme,
      settings,
      settingUpdated,
    } = this.props;
    return (
      <HeaderScrollView
        title="Settings"
        containerStyle={{ backgroundColor: theme.grey1 }}
        headerComponentContainerStyle={{
          backgroundColor: theme.grey1,
          borderBottomWidth: 1,
          borderBottomColor: theme.grey2,
        }}
        headerComponentStyle={{
          backgroundColor: theme.grey1,
        }}
        headlineStyle={{ color: theme.foreground }}
        titleStyle={{
          color: theme.foreground,
          marginBottom: 0,
        }}
        scrollContainerStyle={{
          backgroundColor: theme.grey1,
        }}
        fadeDirection="up"
      >
        <Section title="Brewing">
          <Group title="Recipe settings" />
          <Group title="Grinder" />
          <Group title="Units" />
          <Group title="Menu" />
        </Section>
        <Section title="General">
          <SwitchSetting
            title="Dark Mode"
            value={isDarkTheme}
            onChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Expert Mode"
            description="Displays only calculations and timers within recipes."
            value={settings.expertMode}
            onChange={value => settingUpdated({ setting: 'expertMode', value })}
          />
          {/* <Text>Rate Single Origin</Text>
          <Text>About this app</Text> */}
        </Section>
      </HeaderScrollView>
    );
  }
}

export default withSettings(withTheme(Settings));
