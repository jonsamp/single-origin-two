import { palette, shadows } from '@expo/styleguide-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, TextInput, Dimensions, Text, Platform, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useTheme, useTailwind } from '../../common/theme';
import { styleguide } from '../../constants/themes';
import { IncrementButton } from './IncrementButton';
import { MinusIcon } from './MinusIcon';
import { PlusIcon } from './PlusIcon';

const { maxWidth } = styleguide;
const screenWidth = Dimensions.get('screen').width;
const isMaxWidth = screenWidth >= styleguide.maxWidth;
const SLIDER_WIDTH = isMaxWidth ? maxWidth - 64 : screenWidth - 64;
const KNOB_WIDTH = 42;

type Props = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
  style?: ViewStyle;
};

async function haptic() {
  if (Platform.OS === 'ios') {
    await Haptics.selectionAsync();
  }
}

function getStepValue(value: number, oneStepValue: number, min: number) {
  'worklet';
  return Math.round(value / oneStepValue) + min;
}

function clamp(translationX: number, offsetX: number) {
  'worklet';
  return Math.min(Math.max(translationX + offsetX, 0), SLIDER_WIDTH - KNOB_WIDTH);
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function Slider(props: Props) {
  const {
    min = 0,
    max = 100,
    defaultValue = 50,
    onChange = () => {},
    label = 'Label',
    style,
  } = props;
  const { dark } = useTheme();
  const tw = useTailwind();
  const sliderRange = SLIDER_WIDTH - KNOB_WIDTH;
  const oneStepValue = sliderRange / (max - min);

  function getXValue(value: number, min: number = 0) {
    return (value - min) * oneStepValue;
  }

  const translateX = useSharedValue(getXValue(defaultValue - min));
  const isSliding = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: { offsetX: number }) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      isSliding.value = true;
      const newValue = clamp(event.translationX, ctx.offsetX);
      const prevStep = Math.round(translateX.value / oneStepValue);
      const nextStep = Math.round(newValue / oneStepValue);

      if (prevStep !== nextStep) {
        runOnJS(haptic)();
      }
      translateX.value = newValue;
    },
    onEnd: (event, ctx) => {
      isSliding.value = false;
      const newValue = clamp(event.translationX, ctx.offsetX);
      runOnJS(onChange)(getStepValue(newValue, oneStepValue, min));
    },
  });

  const sliderValueStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isSliding.value ? 1.25 : 1, {
            duration: 75,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const stepText = useDerivedValue(() => {
    const step = getStepValue(translateX.value, oneStepValue, min);

    return String(step);
  });

  const animatedProps: any = useAnimatedProps(() => {
    return {
      text: stepText.value,
    };
  });

  function increment(value: number) {
    const newValue = Number(stepText.value) + value;

    if (newValue > max || newValue < min) {
      return;
    }

    onChange(newValue);
    haptic();
    translateX.value = withTiming(getXValue(newValue, min), { duration: 100 });
    // @ts-ignore stepText.value is readonly. Setting to update the text on screen.
    stepText.value = String(newValue);
  }

  return (
    <View style={[tw(`pt-10 items-center pb-12 theme.background.tertiary`), style]}>
      <View style={tw('mb-12 items-center')}>
        <View
          style={[
            tw('px-4 mb-2 flex-row items-center justify-between'),
            styles.sliderHeaderContainer,
          ]}>
          <IncrementButton icon={<MinusIcon />} onPress={() => increment(-1)} />
          <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            style={[tw('theme.text.default font-bold'), styles.sliderValue, sliderValueStyle]}
            animatedProps={animatedProps}
            value={stepText.value}
          />
          <IncrementButton icon={<PlusIcon />} onPress={() => increment(1)} />
        </View>
        <Text
          style={[
            tw('callout font-bold uppercase theme.text.default opacity-80'),
            styles.labelStyle,
          ]}>
          {label}
        </Text>
      </View>
      <View style={[tw('justify-center'), styles.slider]}>
        <LinearGradient
          colors={
            dark
              ? [palette.dark.gray['000'], palette.dark.gray[500]]
              : [palette.light.gray[500], palette.light.white]
          }
          locations={[0.2, 0.8]}
          style={[styles.slider, tw('absolute opacity-40')]}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              tw('justify-center items-center rounded-lg'),
              styles.knobContainer,
              scrollTranslationStyle,
              {
                backgroundColor: dark ? palette.dark.gray[500] : palette.light.white,
                top: dark ? 0 : -2,
              },
            ]}>
            <LinearGradient
              colors={
                dark
                  ? [palette.dark.gray[400], palette.dark.gray[500]]
                  : [palette.light.gray[300], palette.light.white]
              }
              locations={[0.3, 0.9]}
              style={styles.knob}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default Slider;

const styles = StyleSheet.create({
  slider: {
    height: KNOB_WIDTH / 5,
    width: SLIDER_WIDTH,
    borderRadius: KNOB_WIDTH / 5 / 2,
  },
  knobContainer: {
    width: KNOB_WIDTH,
    height: KNOB_WIDTH,
    ...shadows.tiny,
  },
  knob: {
    width: KNOB_WIDTH - 10,
    height: KNOB_WIDTH - 10,
    borderRadius: 3,
  },
  sliderHeaderContainer: {
    width: SLIDER_WIDTH,
  },
  labelStyle: {
    letterSpacing: 0.5,
  },
  sliderValue: {
    fontSize: 48,
    fontFamily: Platform.select({ ios: 'Menlo' }),
  },
});
