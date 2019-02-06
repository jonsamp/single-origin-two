import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  title: PropTypes.string,
};

function Title({ title, theme }) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: theme.primary }]} />
      <Text
        style={[
          styles.title,
          {
            color: theme.foreground,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

Title.propTypes = propTypes;

export default withTheme(Title);
