import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';

const propTypes = {
  theme: PropTypes.object,
  text: PropTypes.string,
};

function Instructions({ text, theme }) {
  const specialWordCaptureGroup = /(\*\*.*?\*\*)/g;
  const specialWordRegex = /\*\*.*\*\*/;
  const specialWordStyles = {
    ...type.body,
    fontSize: 18,
    color: theme.primary,
    fontWeight: 'bold',
  };
  const formattedText = text.split(specialWordCaptureGroup).map(part => (
    <Text
      key={part}
      style={part.match(specialWordRegex) ? specialWordStyles : null}
    >
      {part.replace(/\*/g, '')}
    </Text>
  ));

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          ...type.body,
          color: theme.foreground,
        }}
      >
        {formattedText}
      </Text>
    </View>
  );
}

Instructions.propTypes = propTypes;

export default withTheme(Instructions);
