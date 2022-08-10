import { shadows } from '@expo/styleguide-native';
import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
};

function Card(props: Props) {
  const { children, style, containerStyle } = props;
  const tw = useTailwind();

  return (
    <View style={[shadows.micro, tw('rounded-lg mb-8'), containerStyle]}>
      <View style={[tw('bg-overlay dark:bg-overlay-dark rounded-lg overflow-hidden'), style]}>
        {children}
      </View>
    </View>
  );
}

export default Card;
