import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  leftWidth?: string;
};

export function Separator(props: Props) {
  const { leftWidth } = props;
  const tw = useTailwind();

  return (
    <View style={[tw('flex-row overflow-hidden'), { height: 1 }]}>
      <View style={tw(`w-4 bg-overlay dark:bg-overlay-dark ${leftWidth ?? ''}`)} />
      <View style={[tw('flex-1 border border-default dark:border-default-dark')]} />
    </View>
  );
}
