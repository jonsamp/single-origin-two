import React, { ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { useTailwind } from '../../common/theme';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  borderTop?: boolean;
  style?: ViewStyle;
};

const SettingWrapper = (props: Props) => {
  const { children, title, description, borderTop = false, style } = props;
  const tw = useTailwind();

  return (
    <View style={tw('theme.background.screen')}>
      <View
        style={[
          tw(
            `px-4 h-12 justify-center border-b theme.border.default ${
              borderTop ? 'border-t' : ''
            } theme.background.overlay`
          ),
          style,
        ]}>
        <View style={tw('flex-row justify-between items-center')}>
          <Text style={tw('body theme.text.default capitalize')}>{title}</Text>
          {children}
        </View>
      </View>
      {description ? (
        <View style={tw('px-4 pt-2 pb-8')}>
          <Text style={tw('caption theme.text.secondary')}>{description}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default SettingWrapper;
