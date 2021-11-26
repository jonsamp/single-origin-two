import React from 'react';
import { Text, View } from 'react-native';

import { useTailwind } from '../../common/theme';
import styles from './styles';

type Props = {
  text: string;
};

function ScreenPlaceholder(props: Props) {
  const { text } = props;
  const tw = useTailwind();

  return (
    <View style={styles.placeholderContainer}>
      <Text style={[tw('theme.text.secondary body text-center')]}>{text}</Text>
    </View>
  );
}

export default ScreenPlaceholder;
