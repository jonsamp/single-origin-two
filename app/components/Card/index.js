import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withTheme from 'providers/theme';
import { width } from 'constants/layout';

const propTypes = {
  theme: PropTypes.object,
  showConnector: PropTypes.bool,
  children: PropTypes.node,
};

function Card({ theme, showConnector, children }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: theme.grey1,
          borderRadius: 12,
          minHeight: 16,
          overflow: 'hidden',
          width: '100%',
          marginBottom: showConnector ? 0 : 32,
        }}
      >
        {children}
      </View>
      {showConnector && (
        <View
          style={{
            width: 8,
            height: 32,
            backgroundColor: theme.grey1,
          }}
        />
      )}
    </View>
  );
}

Card.propTypes = propTypes;

export default withTheme(Card);
