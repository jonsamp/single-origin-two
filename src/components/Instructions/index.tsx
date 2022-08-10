import React from 'react';
import { TextStyle, View, ViewStyle, StyleSheet } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import { typography } from '../../common/typography';
import { Text } from '../../components/Text';
import GrindIcon from './icons/GrindIcon';
import IceIcon from './icons/IceIcon';
import PrepIcon from './icons/PrepIcon';
import RecordIcon from './icons/RecordIcon';
import TipIcon from './icons/TipIcon';
import WaterIcon from './icons/WaterIcon';

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
            tw('pt-5 items-center w-12'),
            {
              backgroundColor: dark ? theme.background.secondary : theme.text.default,
            },
          ]}>
          <IconComponent fill={dark ? theme.icon.default : theme.background.overlay} />
        </View>
      ) : null}
      <View style={[tw(`p-4 flex-1 ${twStyle ? twStyle : ''}`), style]}>
        <Text style={textStyle}>
          {text.split(specialWordCaptureGroup).map((part, index) => (
            <Text
              key={part + index}
              style={
                part.match(specialWordRegex) && tw('font-bold text-brand dark:text-brand-dark')
              }>
              {part.replace(/\*/g, '')}
            </Text>
          ))}
        </Text>
        {hint ? (
          <View
            style={[
              tw(
                'p-3 rounded-md mt-4 bg-warning dark:bg-warning-dark border border-warning dark:border-warning-dark'
              ),
            ]}>
            <Text style={[tw('text-warning dark:text-warning-dark'), textStyle]}>{hint}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
