import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { withNavigation, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import withTheme from 'providers/theme';
import { selectLog } from 'state/logs/selectors';
import Header from 'components/Header';

const mapStateToProps = (state, props) => {
  const { timestamp } = props.navigation.state.params;
  return {
    log: selectLog(state, timestamp),
  };
};

class BrewSummary extends Component {
  static propTypes = {
    theme: PropTypes.object,
    navigation: PropTypes.object,
    log: PropTypes.object,
  };

  render() {
    const { navigation, theme, log } = this.props;
    console.log({ log });
    return (
      <View>
        <Header
          title="Brew Summary"
          onBack={() => navigation.dispatch(StackActions.popToTop())}
        />
        <View
          style={{
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme.foreground, fontSize: 32 }}>
            {JSON.stringify(log, null, 2)}
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(withNavigation(withTheme(BrewSummary)));
