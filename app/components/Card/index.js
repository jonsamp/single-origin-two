import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withTheme from 'providers/theme';

const propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
  feature: PropTypes.bool,
};

function Card({ theme, children, feature }) {
  return (
    <View
      style={{
        backgroundColor: feature ? theme.grey2 : theme.grey1,
        borderRadius: 8,
        minHeight: 16,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 40,
      }}
    >
      {children}
    </View>
  );
}

Card.propTypes = propTypes;

export default withTheme(Card);
