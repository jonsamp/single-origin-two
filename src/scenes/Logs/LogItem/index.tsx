import { iconSize } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { View, TouchableOpacity as RNTouchableOpacity, Platform } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../../common/theme';
import { Text } from '../../../components/Text';
import { width } from '../../../constants/layout';
import { recipes } from '../../../constants/recipes';
import { Log } from '../../../state/logs/types';
import { TrashIcon } from './TrashIcon';

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
  const { theme } = useTheme();
  const tw = useTailwind();
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
          (Math.abs(prevValue) < halfwayDistance && Math.abs(newValue) >= halfwayDistance) ||
          (Math.abs(prevValue) > halfwayDistance && Math.abs(newValue) <= halfwayDistance)
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
    <Animated.View style={[animatedHeightStyle, tw('overflow-hidden')]}>
      <RNTouchableOpacity
        activeOpacity={1}
        onPress={() => _onDelete()}
        style={[
          tw('absolute right-0 w-full h-full justify-center items-end pr-5'),
          {
            backgroundColor: 'red', // TODO: update this to a real color
          },
        ]}>
        <Animated.View style={[tw('items-center'), animatedTrashStyle]}>
          <TrashIcon size={28} />
          <Text type="label" style={[tw('text-white')]}>
            Delete
          </Text>
        </Animated.View>
      </RNTouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-20, 20]}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            onPress={() => _onPress()}
            activeOpacity={1}
            style={tw('bg-overlay dark:bg-overlay-dark p-3 justify-between items-center flex-row')}>
            <View style={tw('flex-1 flex-row')}>
              <View
                style={tw(
                  'bg-tertiary dark:bg-tertiary-dark h-14 w-14 items-center justify-center rounded-lg mr-3'
                )}>
                {recipe.icon({
                  fill: theme.icon.default,
                  size: 0.8,
                })}
                {log.rating && (
                  <View
                    style={[
                      tw(
                        'w-5 h-5 absolute right-1 bottom-1 rounded-full items-center justify-center'
                      ),
                      {
                        backgroundColor: theme.brand.default,
                      },
                    ]}>
                    <Text type="label" style={tw('text-black')}>
                      {log.rating}
                    </Text>
                  </View>
                )}
              </View>
              <View style={tw('flex-1')}>
                <Text type="headline">
                  {recipe.title} {recipe.modifier}
                </Text>
                <Text type="caption" theme="secondary">
                  {format(log.timestamp, 'MMM d, yyyy @ h:mma')}
                </Text>
                {log.tastingNote || log.notes ? (
                  <Text type="caption" theme="secondary" numberOfLines={1}>
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
            <View style={tw('ml-4')}>
              <Feather name="chevron-right" size={iconSize.regular} color={theme.icon.secondary} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

export default ListItem;
