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
  leftText: PropTypes.string,
  right: PropTypes.any,
};

function Header({ navigation, theme, title, leftText = '', right }) {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.grey2,
          backgroundColor: theme.background,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View />
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12, top: 12, right: 12 }}
          >
            <Feather name="chevron-left" size={26} color={theme.foreground} />
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
