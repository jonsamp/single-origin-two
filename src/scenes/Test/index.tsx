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

const screenWidth = Dimensions.get('screen').width

const SLIDER_WIDTH = screenWidth * 0.75
const KNOB_WIDTH = 50
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

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {
      shadowRadius: withTiming(isSliding.value ? 4 : 2, {
        duration: 100,
        easing: Easing.linear,
      }),
      shadowOpacity: withTiming(isSliding.value ? 0.25 : 0.5, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          translateX: translateX.value,
        },
        {
          scale: withTiming(isSliding.value ? 1.1 : 1, {
            duration: 100,
            easing: Easing.linear,
          }),
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 60,
          justifyContent: 'space-between',
          width: SLIDER_WIDTH,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            haptic()
            translateX.value = withTiming(
              getXValue(Number(stepText.value) - 1),
              { duration: 100, easing: Easing.linear }
            )
          }}
          style={{
            backgroundColor: '#ececec',
            height: 55,
            width: 55,
            borderRadius: 25,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 40, color: '#585858' }}>-</Text>
        </TouchableOpacity>
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            textAlign: 'right',
            fontFamily: Platform.select({ ios: 'Menlo' }),
            color: 'black',
          }}
          animatedProps={animatedProps}
          value={stepText.value}
        />
        <TouchableOpacity
          onPress={() => {
            haptic()
            translateX.value = withTiming(
              getXValue(Number(stepText.value) + 1),
              { duration: 100, easing: Easing.linear }
            )
          }}
          style={{
            backgroundColor: '#ececec',
            height: 55,
            width: 55,
            borderRadius: 25,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 40, color: '#585858' }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slider}>
        <LinearGradient
          colors={['#D9D9D9', '#EFEFEF']}
          locations={[0.2, 0.8]}
          style={[
            styles.slider,
            {
              position: 'absolute',
            },
          ]}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knob, scrollTranslationStyle]}>
            <LinearGradient
              colors={['#000000', '#3C3C3C']}
              locations={[0.3, 0.9]}
              style={[
                {
                  width: 36,
                  height: 36,
                  borderRadius: 4,
                },
              ]}
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
    borderRadius: KNOB_WIDTH / 4 / 2,
    justifyContent: 'center',
  },
  knob: {
    height: KNOB_WIDTH,
    width: KNOB_WIDTH,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.5,
  },
})
