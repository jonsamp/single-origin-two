import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withTheme from '@app/providers/theme';

const propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
  style: PropTypes.object,
};

function Card({ theme, children, style }) {
  return (
    <View
      style={{
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowRadius: 10,
        shadowOffset: { height: 6 },
        shadowOpacity: 1,
        backgroundColor: theme.grey1,
        borderRadius: 8,
        marginBottom: 40,
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: theme.grey1,
          borderRadius: 8,
          minHeight: 16,
          ...style,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {children}
      </View>
    </View>
  );
}

Card.propTypes = propTypes;

export default withTheme(Card);
