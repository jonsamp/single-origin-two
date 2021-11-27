import React from 'react';
import { Text, TextStyle, View, ViewStyle, StyleSheet } from 'react-native';
import { typography } from '../../common/typography';
import { useTailwind, useTheme } from '../../common/theme';
import GrindIcon from './icons/GrindIcon';
import PrepIcon from './icons/PrepIcon';
import RecordIcon from './icons/RecordIcon';
import TipIcon from './icons/TipIcon';
import WaterIcon from './icons/WaterIcon';
import IceIcon from './icons/IceIcon';

const icons = {
  WaterIcon,
  RecordIcon,
  GrindIcon,
  TipIcon,
  PrepIcon,
  IceIcon,
};

type Props = {
  text: string;
  isDarkTheme?: boolean;
  icon?: keyof typeof icons;
  style?: ViewStyle;
  twStyle?: string;
  textStyle?: TextStyle;
  hint?: string;
  containerStyle?: ViewStyle;
};

export default function Instructions(props: Props) {
  const { text, icon, style, twStyle, textStyle, hint } = props;
  const { theme, dark } = useTheme();
  const tw = useTailwind();
  const specialWordCaptureGroup = /(\*\*.*?\*\*)/g;
  const specialWordRegex = /\*\*.*\*\*/;
  const IconComponent = icon ? icons[icon] : null;

  return (
    <View style={tw('flex-row')}>
      {IconComponent ? (
        <View
          style={[
            tw('pt-4 items-center w-12'),
            {
              backgroundColor: dark ? theme.background.secondary : theme.text.default,
            },
          ]}
        >
          <IconComponent fill={dark ? theme.icon.default : theme.background.overlay} />
        </View>
      ) : null}
      <View style={[tw(`p-4 flex-1 ${twStyle ? twStyle : ''}`), style]}>
        <Text style={[tw('body theme.text.default'), textStyle]}>
          {text.split(specialWordCaptureGroup).map((part, index) => (
            <Text
              key={part + index}
              style={
                part.match(specialWordRegex) && {
                  ...typography.body,
                  fontSize: 19,
                  color: theme.brand.dark,
                  fontWeight: 'bold',
                }
              }
            >
              {part.replace(/\*/g, '')}
            </Text>
          ))}
        </Text>
        {hint ? (
          <View
            style={[
              tw('p-3 rounded-md mt-4'),
              {
                backgroundColor: theme.background.warning,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: theme.border.warning,
              },
            ]}
          >
            <Text
              style={[
                typography.body,
                {
                  color: theme.text.warning,
                },
                textStyle,
              ]}
            >
              {hint}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
