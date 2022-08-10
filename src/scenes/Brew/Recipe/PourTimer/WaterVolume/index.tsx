import React, { useEffect, useRef } from 'react';
import { View, Platform, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
  Easing,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../../../../common/theme';
import { typography } from '../../../../../common/typography';
import { Text } from '../../../../../components/Text';
import { UnitHelper } from '../../../../../state/settings/types';

interface Props {
  volume: number;
  waterVolumeUnit: UnitHelper;
  pourVelocity?: number;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function usePrevious(value: number) {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

let timeout: NodeJS.Timeout;

function WaterVolume(props: Props) {
  const { volume, waterVolumeUnit, pourVelocity = 130 } = props;
  const tw = useTailwind();
  const { theme } = useTheme();
  const prevVolume = usePrevious(volume);
  const volumeValue = useSharedValue(0);
  const isCountingValue = useSharedValue(0);
  const inputRange = [0, 1];

  useEffect(function didMount() {
    return timeout && clearTimeout(timeout);
  }, []);

  useEffect(
    function didUpdate() {
      const differenceToAdd = volume - Number(prevVolume ?? 0);

      if (differenceToAdd > 0) {
        if (timeout) {
          clearTimeout(timeout);
        }

        const duration = differenceToAdd * pourVelocity;

        volumeValue.value = withTiming(volume, {
          duration,
          easing: Easing.linear,
        });

        isCountingValue.value = withTiming(1, { duration: 250 });
        timeout = setTimeout(() => {
          isCountingValue.value = withTiming(0, { duration: 250 });
        }, duration);
      }
    },
    [volume]
  );

  const animatedProps = useAnimatedProps(() => {
    const colorValue = interpolateColor(isCountingValue.value, inputRange, [
      theme.text.default,
      theme.background.default,
    ]);

    if (waterVolumeUnit.unit.id === 'cups') {
      const formattedValue = volumeValue.value * 0.01;

      return {
        text: String(formattedValue.toFixed(2)),
        color: colorValue,
      };
    }

    if (waterVolumeUnit.unit.id === 'ounces') {
      const formattedValue = volumeValue.value * 0.035274;

      return {
        text: String(formattedValue.toFixed(1)),
        color: colorValue,
      };
    }

    return {
      text: String(Math.round(volumeValue.value)),
      color: colorValue,
    };
  });

  // @ts-ignore
  const animatedTextColor = useAnimatedStyle(() => {
    const colorValue = interpolateColor(isCountingValue.value, inputRange, [
      theme.text.default,
      theme.background.default,
    ]);

    return {
      color: colorValue,
    };
  }, [isCountingValue]);

  // @ts-ignore
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColorValue = interpolateColor(isCountingValue.value, inputRange, [
      theme.background.default,
      theme.brand.default,
    ]);
    const borderColorValue = interpolateColor(isCountingValue.value, inputRange, [
      theme.border.default,
      theme.brand.default,
    ]);
    const scaleValue = interpolate(isCountingValue.value, inputRange, [1, 1.2]);
    const elevationValue = interpolate(isCountingValue.value, inputRange, [0, 10]);

    return {
      backgroundColor: backgroundColorValue,
      borderColor: borderColorValue,
      shadowOpacity: isCountingValue.value,
      elevation: elevationValue,
      transform: [{ scale: scaleValue }],
    };
  }, [isCountingValue]);

  return (
    <View style={tw('flex-1 justify-around')}>
      <Text type="label" style={tw('text-center mb-3')}>
        WATER VOLUME
      </Text>
      <Animated.View
        style={[
          tw('py-3 justify-center items-center border rounded-lg mx-2'),
          {
            shadowColor: 'rgba(82,181,146,1)',
            shadowRadius: 12,
            shadowOffset: { height: 2, width: 0 },
          },
          animatedContainerStyle,
        ]}>
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          animatedProps={animatedProps as any}
          style={[
            tw('text-default dark:text-default-dark'),
            {
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: Platform.select({ ios: 'Menlo' }),
            },
          ]}
          value="0"
        />
        <Animated.Text
          style={[
            tw('text-center pb-1 text-default dark:text-default-dark'),
            typography.label,
            animatedTextColor,
          ]}
          numberOfLines={1}>
          {waterVolumeUnit.unit.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

export default WaterVolume;
