import React from 'react';
import { View, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '../../../../../components/Button';
import { Text } from '../../../../../components/Text';
import formatSeconds from '../../../../../helpers/formatSeconds';

type Props = {
  timerRunning: boolean;
  toggleCountdown: () => void;
  second: number;
};

function Timer(props: Props) {
  const { toggleCountdown, timerRunning, second } = props;
  const tw = useTailwind();

  return (
    <View style={tw('flex-1 mr-5')}>
      <View style={tw('flex-row justify-center flex-1')}>
        <Text
          style={[
            tw('mb-3 text-4xl'),
            {
              fontFamily: Platform.select({ ios: 'Menlo-Bold' }),
              fontWeight: Platform.select({ android: '700', ios: '500' }),
            },
          ]}>
          {formatSeconds(second < 0 ? 0 : second)}
        </Text>
      </View>
      <Button
        type={timerRunning ? 'outline' : 'normal'}
        title={timerRunning ? 'stop' : 'start'}
        onPress={toggleCountdown}
      />
    </View>
  );
}

export default Timer;
