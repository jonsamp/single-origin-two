import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
};

const SettingWrapper = ({ children, theme, title, description }) => (
  <View style={{ backgroundColor: theme.grey1 }}>
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.grey2,
        backgroundColor: theme.background,
      }}
    >
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        {children}
      </View>
    </View>
    {description ? (
      <View
        style={{
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
    ) : null}
  </View>
);

SettingWrapper.propTypes = propTypes;

export default withTheme(SettingWrapper);
