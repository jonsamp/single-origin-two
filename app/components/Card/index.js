import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withTheme from 'providers/theme';

const propTypes = {
  theme: PropTypes.object,
  showConnector: PropTypes.bool,
  children: PropTypes.node,
};

function Card({ theme, showConnector, children }) {
  return (
    <View style={{ alignItems: 'center' }}>
      {showConnector && (
        <View
          style={{
            width: 8,
            height: 44,
            backgroundColor: theme.grey1,
            opacity: 0.5,
          }}
        />
      )}
      <View
        style={{
          backgroundColor: theme.grey1,
          borderRadius: 12,
          minHeight: 16,
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
