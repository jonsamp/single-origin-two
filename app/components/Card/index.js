import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withTheme from 'providers/theme';

const propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
};

function Card({ theme, children }) {
  return (
    <View
      style={{
        backgroundColor: theme.grey1,
        borderRadius: 26,
        minHeight: 16,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 32,
      }}
    >
      {children}
    </View>
  );
}

Card.propTypes = propTypes;

export default withTheme(Card);
