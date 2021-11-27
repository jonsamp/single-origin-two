import React, { ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { useTailwind } from '../../common/theme';

type Props = {
  children: ReactNode;
  title: string;
  style?: ViewStyle;
};

function SettingWrapper(props: Props) {
  const { children, title, style } = props;
  const tw = useTailwind();

  return (
    <View style={tw('theme.background.screen')}>
      <View style={[tw(`px-4 h-12 justify-center theme.background.overlay`), style]}>
        <View style={tw('flex-row justify-between items-center')}>
          <Text style={tw('body theme.text.default capitalize')}>{title}</Text>
          {children}
        </View>
      </View>
    </View>
  );
}

export default SettingWrapper;
