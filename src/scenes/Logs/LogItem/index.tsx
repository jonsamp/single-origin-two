import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import {
  Text,
  View,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  Transition,
  Transitioning,
  withSequence,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler'

import { width } from '../../../constants/layout'
import recipes from '../../../constants/recipes'
import type from '../../../constants/type'
import { useTheme } from '../../../providers/theme'
import { Log } from '../../../types'
import styles from './styles'

function consoleLog(value) {
  console.log('❄️ ', value)
}

// TODO:
// If I scroll too far, I need a haptic, and likely the "delete" word/icon to change, or for the background to get darker.
// Re-work the layout to make all the items 80px height

type Props = {
  log: Log
  onDelete: (timestamp: number) => void
  onPress: () => void
}

type GestureContext = {
  startX: number
}

function ListItem(props: Props) {
  const { log, onPress, onDelete } = props
  const { colors, isDarkTheme } = useTheme()
  const x = useSharedValue(0)
  const height = useSharedValue(80)
  const recipe = recipes[log.recipeId]
  const timingConfig = {
    duration: 250,
    easing: Easing.out(Easing.sin),
  }

  function _onPress() {
    x.value = withTiming(0, timingConfig)
    onPress()
  }

  function _onDelete() {
    x.value = withTiming(-width, timingConfig)
    height.value = withTiming(0, timingConfig, () => {
      runOnJS(onDelete)(log.timestamp)
    })
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startX = x.value
    },
    onActive: (event, ctx) => {
      const distanceFromStartTraveled = event.translationX + ctx.startX

      if (distanceFromStartTraveled < 0) {
        x.value = distanceFromStartTraveled
      }
    },
    onEnd: (event, ctx) => {
      const distanceFromStartTraveled = event.translationX + ctx.startX
      runOnJS(consoleLog)(distanceFromStartTraveled)

      // dragged left
      if (distanceFromStartTraveled < 0) {
        const distance = Math.abs(distanceFromStartTraveled)

        if (distance > width * 0.1) {
          x.value = withTiming(-100, timingConfig)
        } else if (distance > 0) {
          x.value = withTiming(0, timingConfig)
        }
      } else {
        // if you scroll left then right, close the thing
        x.value = withTiming(0, timingConfig)
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    }
  })

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  return (
    <Animated.View style={[animatedHeightStyle, { overflow: 'hidden' }]}>
      <RNTouchableOpacity
        activeOpacity={1}
        onPress={_onDelete}
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          right: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 16,
        }}
      >
        <Text>Delete</Text>
      </RNTouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            onPress={_onPress}
            activeOpacity={1}
            style={[
              styles.container,
              styles.displayHorizontal,
              {
                backgroundColor: isDarkTheme ? colors.grey2 : colors.background,
              },
            ]}
          >
            <View style={[styles.displayHorizontal, { flex: 1 }]}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isDarkTheme
                      ? colors.grey1
                      : colors.foreground,
                  },
                ]}
              >
                {recipe.icon({
                  fill: isDarkTheme ? colors.foreground : colors.background,
                  size: 0.8,
                })}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.headline, { color: colors.foreground }]}>
                  {recipe.title} {recipe.modifier}
                </Text>
                <Text
                  style={[
                    type.caption,
                    { color: colors.foreground, opacity: 0.8 },
                  ]}
                >
                  {format(log.timestamp, 'MMM d, yyyy @ h:mma')}
                </Text>
                {log.notes ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      type.caption,
                      { color: colors.foreground, opacity: 0.8 },
                    ]}
                  >
                    {log.notes}
                  </Text>
                ) : null}
                {log.tastingNote ? (
                  <Text
                    style={[
                      type.caption,
                      { color: colors.foreground, opacity: 0.8 },
                    ]}
                  >
                    Tasting note:{' '}
                    {log.tastingNote.charAt(0).toUpperCase() +
                      log.tastingNote.toString().slice(1)}
                  </Text>
                ) : null}
                {log.rating ? (
                  <Text
                    style={[
                      type.caption,
                      { color: colors.foreground, opacity: 0.8 },
                    ]}
                  >
                    Rating: {log.rating}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Feather
                name="chevron-right"
                size={colors.iconSize}
                color={colors.foreground}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default ListItem
