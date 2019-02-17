import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withNavigation, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import withTheme from 'providers/theme';
import { selectLog } from 'state/logs/selectors';
import Header from 'components/Header';
import Log from 'components/Log';

const mapStateToProps = (state, props) => {
  const { timestamp } = props.navigation.state.params;
  return {
    log: selectLog(state, timestamp),
  };
};

class BrewSummary extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          title="Brew Summary"
          onBack={() => navigation.dispatch(StackActions.popToTop())}
        />
        <Log timestamp={navigation.state.params.timestamp} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(withNavigation(withTheme(BrewSummary)));
