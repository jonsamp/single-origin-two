import React, { useEffect, useRef } from "react";
import { Text, View, Platform, TextInput } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";

import { UnitHelper } from "../../../../../types";
import { useTheme } from "../../../../../providers/theme";
import styles from "./styles";

interface Props {
  volume: number;
  waterVolumeUnit: UnitHelper;
  pourVelocity?: number;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

let timeout;

function WaterVolume(props: Props) {
  const { volume, waterVolumeUnit, pourVelocity = 130 } = props;
  const prevVolume = usePrevious(volume);
  const { colors } = useTheme();
  const volumeValue = useSharedValue(0);
  const isCountingValue = useSharedValue(0);
  const inputRange = [0, 1];

  useEffect(function didMount() {
    return timeout && clearTimeout(timeout);
  }, []);

  useEffect(
    function didUpdate() {
      const differenceToAdd = volume - Number(prevVolume || 0);

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
      colors.foreground,
      colors.background,
    ]);

    if (waterVolumeUnit.unit.id === "cups") {
      const formattedValue = volumeValue.value * 0.01;

      return {
        text: String(formattedValue.toFixed(2)),
        color: colorValue,
      };
    }

    if (waterVolumeUnit.unit.id === "ounces") {
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
      colors.foreground,
      colors.background,
    ]);

    return {
      color: colorValue,
    };
  }, [isCountingValue]);

  // @ts-ignore
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColorValue = interpolateColor(
      isCountingValue.value,
      inputRange,
      [colors.background, colors.primary]
    );
    const borderColorValue = interpolateColor(
      isCountingValue.value,
      inputRange,
      [colors.grey3, colors.primary]
    );
    const scaleValue = interpolate(isCountingValue.value, inputRange, [1, 1.2]);
    const elevationValue = interpolate(
      isCountingValue.value,
      inputRange,
      [0, 10]
    );

    return {
      backgroundColor: backgroundColorValue,
      borderColor: borderColorValue,
      shadowOpacity: isCountingValue.value,
      elevation: elevationValue,
      transform: [{ scale: scaleValue }],
    };
  }, [isCountingValue]);

  return (
    <View style={styles.section}>
      <Text style={[styles.labelText, { color: colors.foreground }]}>
        WATER VOLUME
      </Text>
      <Animated.View style={[styles.trackingContainer, animatedContainerStyle]}>
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          animatedProps={animatedProps}
          style={[
            {
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: Platform.select({ ios: "Menlo" }),
            },
          ]}
          value={"0"}
        />
        <Animated.Text
          style={[styles.trackingLabelText, animatedTextColor]}
          numberOfLines={1}
        >
          {waterVolumeUnit.unit.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

export default WaterVolume;
