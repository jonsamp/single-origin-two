import React from 'react';
import { View } from 'react-native';

import { useTailwind } from '../common/theme';

type Props = {
  leftWidth?: string;
};

export function Separator(props: Props) {
  const { leftWidth } = props;
  const tw = useTailwind();

  return (
    <View style={[tw('flex-row overflow-hidden'), { height: 1 }]}>
      <View style={tw(`w-4 theme.background.overlay ${leftWidth ?? ''}`)} />
      <View style={[tw('flex-1 border theme.border.default')]} />
    </View>
  );
}
