import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import withTheme from 'providers/theme';

class AppContainer extends Component {
  static propTypes = {
    theme: PropTypes.object,
  };

  state = {};

  render() {
    const { theme, toggleTheme } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.foreground }}>hello 👋</Text>
        <Button title="toggle theme" onPress={toggleTheme} />
      </View>
    );
  }
}

export default withTheme(AppContainer);
