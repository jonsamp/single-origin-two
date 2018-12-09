import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import withTheme from 'providers/theme';
import Header from 'components/Header';
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
    navigation: PropTypes.object,
  };

  state = {};

  render() {
    const { theme, toggleTheme, isDarkTheme, navigation } = this.props;
    const group = this.props.navigation.state.params;
    let children;

    switch (group.toLowerCase().replace(' ', '-')) {
      case 'recipe-settings':
        children = (
          <Fragment>
            <Section>
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
            </Section>
          </Fragment>
        );
        break;
      case 'grind':
        children = (
          <Fragment>
            <Section>
              <SwitchSetting
                title="Grinder"
                description="Record your grind setting each brew"
                value={isDarkTheme}
                onValueChange={toggleTheme}
                valueName="darkMode"
              />
            </Section>
          </Fragment>
        );
        break;
      case 'units':
        children = (
          <Fragment>
            <Section>
              <SwitchSetting
                title="Temperature Units"
                description="Restore your previous brew's coffee weight, grind, and water temperature."
                value={isDarkTheme}
                onValueChange={toggleTheme}
                valueName="darkMode"
              />
              <SwitchSetting
                title="Weight Units"
                description="Restore your previous brew's coffee weight, grind, and water temperature."
                value={isDarkTheme}
                onValueChange={toggleTheme}
                valueName="darkMode"
              />
            </Section>
          </Fragment>
        );
        break;
      case 'menu':
        children = (
          <Fragment>
            <Section>
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
          </Fragment>
        );
        break;
      default:
        children = null;
    }

    return (
      <View style={{ backgroundColor: theme.grey1, flex: 1 }}>
        <Header title={group} />
        <ScrollView>{children}</ScrollView>
      </View>
    );
  }
}

export default withNavigation(withTheme(Settings));
