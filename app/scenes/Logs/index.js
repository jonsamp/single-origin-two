import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Logs extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { theme } = this.props;
    return (
      <View
        style={{
          backgroundColor: theme.background,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ color: theme.foreground }}>Logs</Text>
      </View>
    );
  }
}

export default withTheme(Logs);
