import { spacing } from '@expo/styleguide-native';
import React, { ReactNode } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTailwind } from '../../common/theme';

import { isMaxWidth } from '../../constants/layout';
import { styleguide } from '../../constants/themes';

type Props = {
  children: ReactNode;
  style: ViewStyle;
  wrapperStyle: ViewStyle;
  contentContainerStyle?: ViewStyle;
};

function ResponsiveScrollView(props: Props) {
  const { children, wrapperStyle, style, contentContainerStyle } = props;
  const insets = useSafeAreaInsets();
  const tw = useTailwind();

  return (
    <View style={[tw('flex-1'), wrapperStyle]}>
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: spacing[4],
            paddingTop: spacing[8],
            paddingBottom: insets.bottom,
            ...(isMaxWidth && { alignItems: 'center' }),
            ...contentContainerStyle,
          },
          style,
        ]}
      >
        <View style={isMaxWidth && { width: styleguide.maxWidth }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

export default ResponsiveScrollView;
