import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string,
  right: PropTypes.any,
  isDarkTheme: PropTypes.bool,
  onBack: PropTypes.func,
};

function Header({ navigation, theme, title, right, isDarkTheme, onBack }) {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: isDarkTheme ? theme.grey1 : theme.grey2,
          backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View />
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => (onBack ? onBack() : navigation.goBack())}
            style={{ padding: 12, top: 12, right: 12 }}
          >
            <Feather name="chevron-left" size={30} color={theme.foreground} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <View style={styles.right}>{right}</View>
        <View />
      </View>
    </View>
  );
}

Header.propTypes = propTypes;

export default withNavigation(withTheme(Header));
