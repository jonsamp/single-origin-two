import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
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
import { useTheme } from '../../providers/theme'
import { PlusIcon } from './PlusIcon'
import { MinusIcon } from './MinusIcon'
import { IncrementButton } from './IncrementButton'

const screenWidth = Dimensions.get('screen').width

const SLIDER_WIDTH = screenWidth * 0.75
const KNOB_WIDTH = 44
const MAX_RANGE = 100
const sliderRange = SLIDER_WIDTH - KNOB_WIDTH
const oneStepValue = sliderRange / MAX_RANGE

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function getStepValue(value) {
  return Math.ceil(value / oneStepValue)
}

function getXValue(value) {
  return Math.floor(value * oneStepValue)
}

function log(value) {
  console.log(getStepValue(value))
}

async function haptic() {
  if (Platform.OS === 'ios') {
    await Haptics.selectionAsync()
  }
}

export default function Slider1() {
  const { colors } = useTheme()
  const translateX = useSharedValue(getXValue(5))
  const isSliding = useSharedValue(false)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: { offsetX: number }) => {
      ctx.offsetX = translateX.value
      isSliding.value = true
    },
    onActive: (event, ctx) => {
      const newValue = Math.min(
        Math.max(event.translationX + ctx.offsetX, 0),
        SLIDER_WIDTH - KNOB_WIDTH
      )

      const prevStep = Math.ceil(translateX.value / oneStepValue)
      const nextStep = Math.ceil(newValue / oneStepValue)

      if (prevStep !== nextStep) {
        runOnJS(haptic)()
      }
      translateX.value = newValue
    },
    onEnd: (event, ctx) => {
      isSliding.value = false
      runOnJS(log)(
        Math.min(
          Math.max(event.translationX + ctx.offsetX, 0),
          SLIDER_WIDTH - KNOB_WIDTH
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
    const step = Math.ceil(translateX.value / oneStepValue)

    return String(step)
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      text: stepText.value,
    }
  })

  function increment(value: number) {
    // TODO: disable the increment button if it's at the min or max
    // TODO: call the on change call back from here

    haptic()

    translateX.value = withTiming(getXValue(Number(stepText.value) + value), {
      duration: 100,
      easing: Easing.linear,
    })
  }

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
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
  },
  knob: {
    width: KNOB_WIDTH - 10,
    height: KNOB_WIDTH - 10,
    borderRadius: 3,
  },
  sliderHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    justifyContent: 'space-between',
    width: SLIDER_WIDTH,
  },
  sliderValue: {
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: Platform.select({ ios: 'Menlo' }),
    color: 'black',
  },
})
