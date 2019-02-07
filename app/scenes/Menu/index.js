import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import Button from 'components/Button';
// import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.object,
};

function Menu({ theme, navigation }) {
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: theme.foreground, fontSize: 32 }}>Menu</Text>
      <Button
        onPress={() => navigation.navigate('Brew', { id: 'KalitaWave' })}
        title="Kalita Wave"
      />
      <Button
        onPress={() => navigation.navigate('Brew', { id: 'Clever' })}
        title="Clever"
      />
    </View>
  );
}

Menu.propTypes = propTypes;

export default withSettings(withNavigation(withTheme(Menu)));
