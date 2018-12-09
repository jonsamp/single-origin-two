import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import withTheme from 'providers/theme';
import HeaderScrollView from 'react-native-header-scroll-view';
import Section from './Section';
import Group from './Group';
import SwitchSetting from './SwitchSetting';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    toggleTheme: PropTypes.func,
    isDarkTheme: PropTypes.bool,
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
        }}
        fadeDirection="up"
      >
        <Section title="Brewing">
          <Group title="Recipe settings" />
          <Group title="Grind" />
          <Group title="Units" />
          <Group title="Menu" />
        </Section>
        <Section title="General">
          <SwitchSetting
            title="Dark Mode"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          {/* <Text>Rate Single Origin</Text>
          <Text>About this app</Text> */}
        </Section>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Settings);
