import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';
import WaterIcon from './icons/WaterIcon';
import RecordIcon from './icons/RecordIcon';
import GrindIcon from './icons/GrindIcon';

const propTypes = {
  theme: PropTypes.object,
  text: PropTypes.string,
  isDarkTheme: PropTypes.bool,
  icon: PropTypes.string,
};

function Instructions({ text, theme, isDarkTheme, icon }) {
  const specialWordCaptureGroup = /(\*\*.*?\*\*)/g;
  const specialWordRegex = /\*\*.*\*\*/;
  const specialWordStyles = {
    ...type.body,
    fontSize: 19,
    color: theme.primaryDark,
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
  const icons = {
    WaterIcon,
    RecordIcon,
    GrindIcon,
  };
  const IconComponent = icons[icon];

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {icon ? (
        <View
          style={{
            paddingTop: 20,
            backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
            alignItems: 'center',
            width: 44,
          }}
        >
          <IconComponent
            fill={isDarkTheme ? theme.foreground : theme.background}
          />
        </View>
      ) : null}
      <View style={{ padding: 20, flex: 1 }}>
        <Text
          style={{
            ...type.body,
            color: theme.foreground,
          }}
        >
          {formattedText}
        </Text>
      </View>
    </View>
  );
}

Instructions.propTypes = propTypes;

export default withTheme(Instructions);
