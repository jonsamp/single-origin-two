import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Haptics from 'expo-haptics';

import { width, height as screenHeight } from '../../../constants/layout';
import { recipes } from '../../../constants/recipes';
import type from '../../../constants/type';
import { useTheme } from '../../../providers/theme';
import { Log } from '../../../types';
import { TrashIcon } from './TrashIcon';
import styles from './styles';

type Props = {
  log: Log;
  onDelete: (timestamp: number) => void;
  onPress: () => void;
};

type GestureContext = {
  startX: number;
};

async function haptic() {
  if (Platform.OS === 'ios') {
    await Haptics.selectionAsync();
  }
}

function ListItem(props: Props) {
  const { log, onPress, onDelete } = props;
  const { colors, isDarkTheme } = useTheme();
  const x = useSharedValue(0);
  const trashX = useSharedValue(0);
  const height = useSharedValue(80);
  const recipe = recipes[log.recipeId];
  const timingConfig = {
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  function _onPress() {
    x.value = withTiming(0, timingConfig);
    onPress();
  }

  function _onDelete() {
    x.value = withTiming(-width, timingConfig);
    height.value = withTiming(0, timingConfig, () => {
      runOnJS(onDelete)(log.timestamp);
    });
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      const distanceFromStartTraveled = event.translationX + ctx.startX;

      if (distanceFromStartTraveled < 0) {
        const prevValue = x.value;
        const newValue = distanceFromStartTraveled;
        const halfwayDistance = width * 0.5;

        if (
          (Math.abs(prevValue) < halfwayDistance &&
            Math.abs(newValue) >= halfwayDistance) ||
          (Math.abs(prevValue) > halfwayDistance &&
            Math.abs(newValue) <= halfwayDistance)
        ) {
          runOnJS(haptic)();
        }

        x.value = distanceFromStartTraveled;

        if (Math.abs(distanceFromStartTraveled) > width * 0.5) {
          trashX.value = withTiming(distanceFromStartTraveled + 80, {
            ...timingConfig,
            duration: 350,
          });
        } else {
          trashX.value = withTiming(0, timingConfig);
        }
      }
    },
    onEnd: (event, ctx) => {
      const distanceFromStartTraveled = event.translationX + ctx.startX;

      trashX.value = withTiming(0, timingConfig);

      // dragged left
      if (distanceFromStartTraveled < 0) {
        const distance = Math.abs(distanceFromStartTraveled);

        if (distance > width * 0.5) {
          trashX.value = withTiming(-width + 80, timingConfig);
          runOnJS(_onDelete)();
        } else if (distance > width * 0.1) {
          x.value = withTiming(-80, timingConfig);
        } else if (distance > 0) {
          x.value = withTiming(0, timingConfig);
        }
      } else {
        // if you scroll left then right, close the thing
        x.value = withTiming(0, timingConfig);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  const animatedTrashStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: trashX.value,
        },
      ],
    };
  });

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <Animated.View style={[animatedHeightStyle, { overflow: 'hidden' }]}>
      <RNTouchableOpacity
        activeOpacity={1}
        onPress={_onDelete}
        style={[
          styles.trashButton,
          {
            backgroundColor: colors.danger,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              alignItems: 'center',
            },
            animatedTrashStyle,
          ]}
        >
          <TrashIcon size={28} />
          <Text
            style={{
              ...type.label,
              color: 'white',
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </RNTouchableOpacity>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        activeOffsetX={[-20, 20]}
      >
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
                {log.rating && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: colors.primary,
                      position: 'absolute',
                      right: 4,
                      bottom: 4,
                      borderRadius: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={[
                        type.label,
                        { color: 'black', fontWeight: 'bold' },
                      ]}
                    >
                      {log.rating}
                    </Text>
                  </View>
                )}
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
                {log.tastingNote || log.notes ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      type.caption,
                      { color: colors.foreground, opacity: 0.8 },
                    ]}
                  >
                    {log.tastingNote &&
                      `${
                        log.tastingNote.charAt(0).toUpperCase() +
                        log.tastingNote.toString().slice(1)
                      } `}
                    {log.notes}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Feather
                name='chevron-right'
                size={colors.iconSize}
                color={colors.foreground}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

export default ListItem;
