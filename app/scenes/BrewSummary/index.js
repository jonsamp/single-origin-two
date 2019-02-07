import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { withNavigation, StackActions } from 'react-navigation';
import withTheme from 'providers/theme';
import Header from 'components/Header';

// import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.object,
};

function BrewSummary({ theme, navigation }) {
  return (
    <View>
      <Header
        title="Brew Summary"
        onBack={() => navigation.dispatch(StackActions.popToTop())}
      />
      <View
        style={{
          backgroundColor: theme.background,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.foreground, fontSize: 32 }}>
          BrewSummary
        </Text>
      </View>
    </View>
  );
}

BrewSummary.propTypes = propTypes;

export default withNavigation(withTheme(BrewSummary));
