import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import withTheme from 'providers/theme';
import HeaderScrollView from 'components/HeaderScrollView';
import Section from './Section';
import SwitchSetting from './SwitchSetting';
import InputSetting from './InputSetting';

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
        headerTitle="Settings"
        containerStyle={{ backgroundColor: theme.grey1 }}
        headerComponentContainerStyle={{ backgroundColor: theme.grey1 }}
        headerComponentStle={{ backgroundColor: theme.grey1 }}
        headerTextStyle={{ color: theme.foreground }}
        headerTitleStyle={{
          color: theme.foreground,
          marginBottom: 0,
        }}
        scrollContainerStyle={{
          backgroundColor: theme.grey1,
        }}
      >
        <Section title="Brew Settings">
          <InputSetting
            title="Coffee water ratio"
            description="Grams of water to grams of coffee ratio. Smaller numbers produce stronger coffee. Default: 16."
            value={15}
            onValueChange={() => {}}
            valueName="ratio"
          />
          <InputSetting
            title="Bloom time"
            description="The number of seconds for the bloom. Default: 45 seconds."
            value={45}
            onValueChange={() => {}}
            valueName="bloomTime"
          />
          <SwitchSetting
            title="Grind setting"
            description="Expert mode removes preparation steps, leaving only calculations and timers."
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Temperature Units"
            description="Restore your previous brew's coffee weight, grind, and water temperature."
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
        </Section>
        <Section title="Recipe Settings">
          <SwitchSetting
            title="Expert mode"
            description="Expert mode removes preparation steps, leaving only calculations and timers."
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Restore last brew"
            description="Restore your previous brew's coffee weight, grind, and water temperature."
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
        </Section>
        <Section title="Recipe Visibility">
          <SwitchSetting
            title="Chemex"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Clever"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="French Press"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="V60"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
        </Section>
        <Section title="App Settings">
          <SwitchSetting
            title="Dark Mode"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Save to Health"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
          <SwitchSetting
            title="Send feedback"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            valueName="darkMode"
          />
        </Section>
        <View style={{ padding: 16, paddingBottom: 120 }}>
          <Text style={{ color: theme.foreground }}>App Version: ##.##</Text>
        </View>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Settings);
