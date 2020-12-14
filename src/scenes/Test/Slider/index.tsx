import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  Platform,
  ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useTheme } from '../../../providers/theme'
import type from '../../../constants/type'
import { styleguide } from '../../../constants/themes'

import { PlusIcon } from './PlusIcon'
import { MinusIcon } from './MinusIcon'
import { IncrementButton } from './IncrementButton'

const { maxWidth } = styleguide
const screenWidth = Dimensions.get('screen').width
const isMaxWidth = screenWidth >= styleguide.maxWidth
const SLIDER_WIDTH = isMaxWidth ? maxWidth - 64 : screenWidth - 64
const KNOB_WIDTH = 40

type Props = {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  label?: string
  style?: ViewStyle
}

async function haptic() {
  if (Platform.OS === 'ios') {
    await Haptics.selectionAsync()
  }
}

function getStepValue(value: number, oneStepValue: number, min: number) {
  'worklet'
  return Math.round(value / oneStepValue) + min
}

function clamp(translationX: number, offsetX: number) {
  'worklet'
  return Math.min(
    Math.max(translationX + offsetX, 0),
    SLIDER_WIDTH - KNOB_WIDTH
  )
}

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function Slider(props: Props) {
  const { min, max, defaultValue, onChange, label, style } = props
  const { colors, isDarkTheme } = useTheme()
  const sliderRange = SLIDER_WIDTH - KNOB_WIDTH
  const oneStepValue = sliderRange / (max - min)

  function getXValue(value: number, min: number = 0) {
    return (value - min) * oneStepValue
  }

  const translateX = useSharedValue(getXValue(defaultValue - min))
  const isSliding = useSharedValue(false)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: { offsetX: number }) => {
      ctx.offsetX = translateX.value
    },
    onActive: (event, ctx) => {
      isSliding.value = true
      const newValue = clamp(event.translationX, ctx.offsetX)
      const prevStep = Math.round(translateX.value / oneStepValue)
      const nextStep = Math.round(newValue / oneStepValue)

      if (prevStep !== nextStep) {
        runOnJS(haptic)()
      }
      translateX.value = newValue
    },
    onEnd: (event, ctx) => {
      isSliding.value = false
      const newValue = clamp(event.translationX, ctx.offsetX)
      runOnJS(onChange)(getStepValue(newValue, oneStepValue, min))
    },
  })

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
    }
  })

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }
  })

  const stepText = useDerivedValue(() => {
    const step = getStepValue(translateX.value, oneStepValue, min)

    return String(step)
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      text: stepText.value,
    }
  })

  function increment(value: number) {
    const newValue = Number(stepText.value) + value

    if (newValue > max || newValue < min) {
      return
    }

    onChange(newValue)
    haptic()
    translateX.value = getXValue(newValue, min)
    stepText.value = String(newValue)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.grey2 }, style]}>
      <View style={styles.sliderHeaderWrapper}>
        <View style={styles.sliderHeaderContainer}>
          <IncrementButton icon={<MinusIcon />} onPress={() => increment(-1)} />
          <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            style={[
              styles.sliderValue,
              sliderValueStyle,
              { color: colors.foreground },
            ]}
            animatedProps={animatedProps}
            value={stepText.value}
          />
          <IncrementButton icon={<PlusIcon />} onPress={() => increment(1)} />
        </View>
        <Text
          style={[
            styles.labelStyle,
            { color: colors.foreground, opacity: 0.8 },
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.slider}>
        <LinearGradient
          colors={
            isDarkTheme
              ? [colors.background, colors.grey3]
              : [colors.grey3, colors.background]
          }
          locations={[0.2, 0.8]}
          style={[styles.slider, styles.track]}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              styles.knobContainer,
              scrollTranslationStyle,
              {
                backgroundColor: isDarkTheme ? '#636363' : colors.foreground,
              },
            ]}
          >
            <LinearGradient
              colors={
                isDarkTheme
                  ? ['#545454', '#828282']
                  : [
                      colors.foreground,
                      Platform.select({ ios: '#3C3C3C', android: '#4d4d4d' }),
                    ]
              }
              locations={[0.3, 0.9]}
              style={styles.knob}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: KNOB_WIDTH,
  },
  slider: {
    height: KNOB_WIDTH / 5,
    width: SLIDER_WIDTH,
    borderRadius: KNOB_WIDTH / 5 / 2,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    opacity: 0.3,
  },
  knobContainer: {
    width: KNOB_WIDTH,
    height: KNOB_WIDTH,
    borderRadius: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.5,
    elevation: 2,
  },
  knob: {
    width: KNOB_WIDTH - 10,
    height: KNOB_WIDTH - 10,
    borderRadius: 3,
  },
  sliderHeaderWrapper: {
    marginBottom: 48,
    alignItems: 'center',
  },
  sliderHeaderContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SLIDER_WIDTH,
  },
  labelStyle: {
    ...type.callout,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: Platform.select({ ios: 'Menlo' }),
    color: 'black',
  },
})
