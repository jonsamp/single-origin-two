import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  onPress: () => void;
  icon: ReactNode;
};

export function IncrementButton(props: Props) {
  const { onPress, icon } = props;
  const tw = useTailwind();

  return (
    <TouchableOpacity
      hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
      onPress={onPress}
      activeOpacity={0.6}
      style={tw(
        'h-12 w-12 rounded-full items-center justify-center bg-quaternary dark:bg-quaternary-dark'
      )}>
      {icon}
    </TouchableOpacity>
  );
}
