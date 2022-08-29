import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Text } from '../../components/Text';

type Props = {
  title: string;
  description: string;
};

function Question(props: Props) {
  const { title, description } = props;
  const tw = useTailwind();

  return (
    <View style={tw('p-5')}>
      <Text type="headline">{title}</Text>
      {description ? (
        <Text type="callout" theme="secondary" style={tw('mt-1')}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

export default Question;
