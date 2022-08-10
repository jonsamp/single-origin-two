import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Text } from '../../components/Text';

type Props = {
  children: ReactNode;
  title: string;
  style?: ViewStyle;
};

function SettingWrapper(props: Props) {
  const { children, title, style } = props;
  const tw = useTailwind();

  return (
    <View style={tw('bg-screen dark:bg-screen-dark')}>
      <View style={[tw(`px-4 h-12 justify-center bg-overlay dark:bg-overlay-dark`), style]}>
        <View style={tw('flex-row justify-between items-center')}>
          <>
            <Text style={tw('capitalize')}>{title}</Text>
            {children}
          </>
        </View>
      </View>
    </View>
  );
}

export default SettingWrapper;
