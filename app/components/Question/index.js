import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';

const propTypes = {
  theme: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
};

function Question({ title, description, theme }) {
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          ...type.headline,
          color: theme.foreground,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            ...type.body,
            color: theme.foreground,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

Question.propTypes = propTypes;

export default withTheme(Question);
