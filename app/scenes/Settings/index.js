import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import withTheme from 'providers/theme';
import HeaderScrollView from 'components/HeaderScrollView';
import SwitchSetting from './SwitchSetting';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Settings extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { theme, toggleTheme } = this.props;
    return (
      <HeaderScrollView
        headerTitle="Settings"
        containerStyle={{ backgroundColor: theme.background }}
        headerComponentContainerStyle={{ backgroundColor: theme.background }}
        headerComponentStle={{ backgroundColor: theme.background }}
        headerTextStyle={{ color: theme.foreground }}
        headerTitleStyle={{ color: theme.foreground }}
        scrollContainerStyle={{
          backgroundColor: theme.background,
        }}
      >
        <View>
          <SwitchSetting
            title="Dark Mode"
            value={theme.name === 'dark'}
            onValueChange={toggleTheme}
            valueName="darkMode"
            theme={theme}
          />
        </View>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Settings);
