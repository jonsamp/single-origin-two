import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import withTheme from 'providers/theme';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Settings extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { theme, toggleTheme } = this.props;
    return (
      <View
        style={{
          backgroundColor: theme.background,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ color: theme.foreground }}>Settings</Text>
        <Button onPress={() => toggleTheme()} title="toggle" />
      </View>
    );
  }
}

export default withTheme(Settings);
