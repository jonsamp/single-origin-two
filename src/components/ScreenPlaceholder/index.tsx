import React from 'react';
import { Text, View } from 'react-native';

import { useTailwind } from '../../common/theme';

type Props = {
  text: string;
};

function ScreenPlaceholder(props: Props) {
  const { text } = props;
  const tw = useTailwind();

  return (
    <View style={tw('items-center justify-center p-8 mt-6 rounded-md')}>
      <Text style={[tw('theme.text.secondary body text-center')]}>{text}</Text>
    </View>
  );
}

export default ScreenPlaceholder;
