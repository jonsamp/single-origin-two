import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from 'providers/theme';
import { View, Text } from 'react-native';
import HeaderScrollView from 'react-native-header-scroll-view';
import type from 'constants/type';
import Section from './Section';
import Group from './Group';
import SettingWrapper from './SettingWrapper';
import SwitchSetting from './SwitchSetting';

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    isDarkTheme: PropTypes.bool,
    toggleTheme: PropTypes.func,
  };

  state = {};

  render() {
    const { theme, toggleTheme, isDarkTheme } = this.props;
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
          paddingBottom: 32,
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
          <SettingWrapper title="Send feedback">{/* */}</SettingWrapper>
          <SettingWrapper title="Rate Single Origin">{/* */}</SettingWrapper>
          <Group title="Privacy Policy" />
          <Group title="About" />
        </Section>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Settings);
