import React from 'react';
import { Text, View, Platform } from 'react-native';

import Button from '../../../../../components/Button';
import formatSeconds from '../../../../../helpers/formatSeconds';
import { useTheme } from '../../../../../providers/theme';
import styles from './styles';

type Props = {
  timerRunning: boolean;
  toggleCountdown: () => void;
  second: number;
};

function Timer(props: Props) {
  const { toggleCountdown, timerRunning, second } = props;
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.timeContainer}>
        <Text
          style={[
            styles.timeText,
            {
              fontFamily: Platform.select({ ios: 'Menlo-Bold' }),
              color: colors.foreground,
              fontWeight: Platform.select({ android: '700', ios: '500' }),
            },
          ]}>
          {formatSeconds(second < 0 ? 0 : second)}
        </Text>
      </View>
      <Button
        type={timerRunning ? 'secondary' : 'normal'}
        title={timerRunning ? 'stop' : 'start'}
        onPress={toggleCountdown}
      />
    </View>
  );
}

export default Timer;
