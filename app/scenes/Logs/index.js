import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';
import Calendar from './Calendar';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Logs extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { theme } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView>
          <Calendar />
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(Logs);
