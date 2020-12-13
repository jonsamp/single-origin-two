import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  Platform,
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
import withSettings from '../../../providers/settings'
import { useTheme } from '../../../providers/theme'
import type from '../../../constants/type'
import { UnitHelpers } from '../../../types'

import { PlusIcon } from './PlusIcon'
import { MinusIcon } from './MinusIcon'
import { IncrementButton } from './IncrementButton'

const screenWidth = Dimensions.get('screen').width
const SLIDER_WIDTH = screenWidth - 64
const KNOB_WIDTH = 44

type Props = {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  label?: string
  unitHelpers?: UnitHelpers
  unitType?: string
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
  const {
    min,
    max,
    defaultValue,
    onChange,
    label,
    unitHelpers,
    unitType,
  } = props

  const sliderRange = SLIDER_WIDTH - KNOB_WIDTH
  const oneStepValue = sliderRange / (max - min)

  function getXValue(value: number, min: number = 0) {
    return (value - min) * oneStepValue
  }

  const { colors } = useTheme()
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
      runOnJS(onChange)(
        getStepValue(
          Math.min(
            Math.max(event.translationX + ctx.offsetX, 0),
            SLIDER_WIDTH - KNOB_WIDTH
          ),
          oneStepValue,
          min
        )
      )
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
    const step = Math.round(translateX.value / oneStepValue) + min

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
    translateX.value = withTiming(getXValue(newValue, min), {
      duration: 100,
      easing: Easing.linear,
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.grey2 }]}>
      <View style={styles.sliderHeaderWrapper}>
        <View style={styles.sliderHeaderContainer}>
          <IncrementButton icon={<MinusIcon />} onPress={() => increment(-1)} />
          <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            style={[styles.sliderValue, sliderValueStyle]}
            animatedProps={animatedProps}
            value={stepText.value}
          />
          <IncrementButton icon={<PlusIcon />} onPress={() => increment(1)} />
        </View>
        <Text style={[styles.labelStyle, { color: colors.foreground }]}>
          {label}
        </Text>
      </View>
      <View style={styles.slider}>
        <LinearGradient
          colors={['#D9D9D9', '#EFEFEF']}
          locations={[0.2, 0.8]}
          style={[styles.slider, styles.track]}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knobContainer, scrollTranslationStyle]}>
            <LinearGradient
              colors={[
                '#000000',
                Platform.select({ ios: '#3C3C3C', android: '#4d4d4d' }),
              ]}
              locations={[0.3, 0.9]}
              style={styles.knob}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

export default withSettings(Slider)

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
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: Platform.select({ ios: 'Menlo' }),
    color: 'black',
  },
})
