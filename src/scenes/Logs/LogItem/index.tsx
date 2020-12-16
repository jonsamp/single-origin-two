import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  Transition,
  Transitioning,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

import recipes from '../../../constants/recipes'
import type from '../../../constants/type'
import withTheme from '../../../providers/theme'
import styles from './styles'

function consoleLog(value) {
  console.log('❄️ ', value)
}

// TODO:
// 1. It's important that only one thing is open at once likely? That would mean i need to control all animations from above :(
// 2. onDelete, I need the parent to call the transitioning animation. If I get that set up, I could call onDelete from the button press or from the scroll too far event.
// 3. If I scroll too far, I need a haptic, and likely the "delete" word/icon to change, or for the background to get darker.

const transition = (
  <Transition.Together>
    <Transition.In durationMs={500} type="slide-bottom" />
    <Transition.Change />
    <Transition.Out durationMs={500} type="slide-bottom" />
  </Transition.Together>
)

const ListItem = ({ log, onPress, theme, isDarkTheme }) => {
  const x = useSharedValue(0)
  const backgroundColorValue = useSharedValue(0)
  const ref = useRef()
  const [height, setHeight] = useState('100%')
  const recipe = recipes[log.recipeId]
  const timingConfig = {
    duration: 250,
    easing: Easing.out(Easing.sin),
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
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

        if (distance > 50) {
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

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          height: height,
          width: '100%',
          backgroundColor: 'red',
        }}
        onPress={() => {
          if (ref && ref.current) {
            ref.current.animateNextTransition()
            // do something
            if (height === '100%') {
              setHeight('10%')
            } else {
              setHeight('100%')
            }
          }
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[
              styles.container,
              styles.displayHorizontal,
              { backgroundColor: isDarkTheme ? theme.grey2 : theme.background },
            ]}
          >
            <View style={[styles.displayHorizontal, { flex: 1 }]}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isDarkTheme
                      ? theme.grey1
                      : theme.foreground,
                  },
                ]}
              >
                {recipe.icon({
                  fill: isDarkTheme ? theme.foreground : theme.background,
                  size: 0.8,
                })}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.headline, { color: theme.foreground }]}>
                  {recipe.title} {recipe.modifier}
                </Text>
                <Text
                  style={[
                    type.caption,
                    { color: theme.foreground, opacity: 0.8 },
                  ]}
                >
                  {format(log.timestamp, 'MMM d, yyyy @ h:mma')}
                </Text>
                {log.notes ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      type.caption,
                      { color: theme.foreground, opacity: 0.8 },
                    ]}
                  >
                    {log.notes}
                  </Text>
                ) : null}
                {log.tastingNote ? (
                  <Text
                    style={[
                      type.caption,
                      { color: theme.foreground, opacity: 0.8 },
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
                      { color: theme.foreground, opacity: 0.8 },
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
                size={theme.iconSize}
                color={theme.foreground}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Transitioning.View>
  )
}

export default withTheme(ListItem)
