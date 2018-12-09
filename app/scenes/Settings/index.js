import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import withTheme from 'providers/theme';
import HeaderScrollView from 'react-native-header-scroll-view';
import { Feather } from '@expo/vector-icons';
import Section from './Section';
import Group from './Group';
import SwitchSetting from './SwitchSetting';
import InputSetting from './InputSetting';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    toggleTheme: PropTypes.func,
    isDarkTheme: PropTypes.bool,
    navigation: PropTypes.object,
  };

  state = {};

  render() {
    const { theme, toggleTheme, isDarkTheme, navigation } = this.props;
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
        </Section>
        <Section title="General">
          <Group title="Menu" />
          <Group title="App" />
          <Group title="About" />
        </Section>
      </HeaderScrollView>
    );
  }
}

export default withNavigation(withTheme(Settings));
