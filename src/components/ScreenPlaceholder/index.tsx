import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Text } from '../../components/Text';

type Props = {
  text: string;
};

function ScreenPlaceholder(props: Props) {
  const { text } = props;
  const tw = useTailwind();

  return (
    <View style={tw('items-center justify-center p-8 mt-6 rounded-md')}>
      <Text theme="secondary" style={[tw('text-center')]}>
        {text}
      </Text>
    </View>
  );
}

export default ScreenPlaceholder;
