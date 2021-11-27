import React from 'react';
import { View } from 'react-native';

import { useTailwind } from '../common/theme';

export function Separator() {
  const tw = useTailwind();

  return (
    <View style={[tw('flex-row overflow-hidden'), { height: 1 }]}>
      <View style={tw('w-4 theme.background.overlay')} />
      <View style={[tw('flex-1 border theme.border.default')]} />
    </View>
  );
}
