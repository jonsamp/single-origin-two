import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  withSequence,
} from 'react-native-reanimated';

import Instructions from '../../../../../components/Instructions';
import { width, isMaxWidth } from '../../../../../constants/layout';
import formatSeconds from '../../../../../helpers/formatSeconds';
import withSettings from '../../../../../providers/settings';
import { useTheme } from '../../../../../providers/theme';
import { Recipe, UnitHelpers } from '../../../../../types';

type Props = {
  recipe: Recipe;
  second: number;
  volume: number;
  unitHelpers: UnitHelpers;
  timerRunning: boolean;
  currentStepDuration: number;
  pourVelocity?: number;
};

const PROGRESS_BAR_HEIGHT = 6;

function StepFunction(props: Props) {
  const {
    second,
    volume,
    timerRunning,
    recipe,
    currentStepDuration,
    unitHelpers,
    pourVelocity = 130,
  } = props;
  const { waterVolumeUnit } = unitHelpers;
  const totalTime = Math.max(...Object.keys(recipe).map((n) => Number(n)));
  const { colors, styleguide } = useTheme();
  const [nextStepText, setNextStepText] = useState('');
  const stepAnimatedValue = useSharedValue(0);
  const progressValue = useSharedValue(0);

  const beforeTimerStart = !timerRunning && second === -3;

  // result used for the progress bar below the step text.
  const recipeWithEventDurations = Object.keys(recipe).reduce((acc, recipeKey) => {
    const event = recipe[recipeKey];

    // If we have a duration, then use it
    if (event.duration) {
      return {
        ...acc,
        [recipeKey]: {
          ...event,
          duration: event.duration,
        },
      };
    }

    // If it's pour event, then look for any previous pour events, and find the volume percent difference.
    // Then use the volume percent difference between the previous pour and the current one to find the volume to add
    // Then use that to calculate duration.
    if (event.type === 'pour') {
      let previousVolumePercent = 0;

      const pourEventKeys = Object.keys(recipe).filter((_recipeKey) => {
        return recipe[_recipeKey].type === 'pour';
      });

      const currentEventPourIndex = pourEventKeys.findIndex((key) => key === recipeKey);

      const previousPourIndex = currentEventPourIndex > 0 ? currentEventPourIndex - 1 : null;

      if (previousPourIndex !== null) {
        previousVolumePercent = recipe[pourEventKeys[previousPourIndex]].volumePercent;
      }

      const differenceInVolumePercent = event.volumePercent - previousVolumePercent;
      const volumeToAdd = differenceInVolumePercent * volume;
      const durationOfPour = volumeToAdd * pourVelocity;

      return {
        ...acc,
        [recipeKey]: {
          ...event,
          duration: Math.round(durationOfPour),
        },
      };
    }

    return {
      ...acc,
      [recipeKey]: {
        ...event,
        duration: 5000,
      },
    };
  }, {});

  function getNextStepText(second: number) {
    const nextStep = recipe[getStepKey(second)];
    let _nextStepText = nextStepText;

    if (!nextStep || nextStep.type === 'finish') {
      _nextStepText = 'End of brew.';
    } else if (nextStep.type === 'pour') {
      _nextStepText = `Pour up to **${waterVolumeUnit
        .getPreferredValue(volume * nextStep.volumePercent)
        .toLocaleString()} ${waterVolumeUnit.unit.title}** of water.`;
    } else if (nextStep.type === 'tip') {
      _nextStepText = nextStep.text;
    }

    if (_nextStepText !== nextStepText) {
      if (beforeTimerStart) {
        return setNextStepText(_nextStepText);
      }

      setTimeout(() => setNextStepText(_nextStepText), 250);
      stepAnimatedValue.value = withSequence(
        withTiming(1, { duration: 250 }),
        withTiming(0, { duration: 250 })
      );
    }
  }

  function getStepKey(second: number) {
    if (second < 0) {
      return 0;
    }

    return Object.keys(recipeWithEventDurations).find((eventKey) => {
      return Number(eventKey) + recipeWithEventDurations[eventKey].duration / 1000 >= second;
    });
  }

  useEffect(function didMount() {
    getNextStepText(second);
  }, []);

  useEffect(
    function didUpdate() {
      getNextStepText(second);

      const nextValue = second / totalTime <= 1 ? second / totalTime : 1;

      if (nextValue >= 0) {
        progressValue.value = withTiming(nextValue, {
          duration: 1000,
          easing: Easing.linear,
        });
      }
    },
    [second, timerRunning]
  );

  function isDuringStep() {
    return second >= getStepKey(second);
  }

  function getText() {
    const nextEvent = getStepKey(second);
    const beforeBrewStart = second === -3 && !timerRunning;
    const brewCountdown = second < 0 && timerRunning;
    const foreshadowNextStep = Number(nextEvent) - second > 5;
    const countdownToNextStep = Number(nextEvent) - second <= 5;

    if (beforeBrewStart) {
      return `Over **${formatSeconds(totalTime)}**, pour over **${waterVolumeUnit
        .getPreferredValue(volume)
        .toLocaleString()} ${waterVolumeUnit.unit.title}** of water. Press **Start** to begin.`;
    }

    if (isDuringStep()) {
      return 'Now';
    }

    if (brewCountdown) {
      return `In **${second * -1}** second${second === -1 ? '' : 's'}`;
    }

    if (countdownToNextStep) {
      const secondsLeft = Number(nextEvent) - second;
      return `In **${secondsLeft}** second${secondsLeft === 1 ? '' : 's'}`;
    }

    if (foreshadowNextStep) {
      const types = {
        pour: 'Next pour',
        tip: 'Next step',
        finish: 'Brew will finish',
      };
      return `${types[recipe[nextEvent].type] || 'Next step'} at **${formatSeconds(
        Number(nextEvent)
      )}**`;
    }

    if (!nextEvent) {
      return '';
    }
  }

  const instructionsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(stepAnimatedValue.value, [0, 0.5], [1, 0]);
    const translateY = interpolate(stepAnimatedValue.value, [0, 1], [0, 24]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    const _width = isMaxWidth ? styleguide.maxWidth : width;

    return {
      width: progressValue.value * _width,
    };
  });

  return (
    <View>
      <View
        style={{
          padding: 24,
          paddingBottom: 24 + PROGRESS_BAR_HEIGHT,
          minHeight: Platform.select({ android: 120 }),
        }}>
        <Instructions
          text={getText()}
          textStyle={{ fontSize: 20, lineHeight: 30 }}
          style={{
            padding: 0,
            minHeight: Platform.select({ android: 30 }),
            justifyContent: Platform.select({ android: 'center' }),
          }}
          twStyle="p-0"
        />
        {!beforeTimerStart && (
          <View style={{ minHeight: 30 }}>
            <Animated.View
              style={[instructionsStyle, { marginTop: Platform.select({ ios: 4, android: 0 }) }]}>
              <Instructions
                text={nextStepText}
                style={{
                  opacity: isDuringStep() ? 1 : 0.4,
                  padding: 0,
                }}
                twStyle="p-0"
                textStyle={{
                  fontSize: 20,
                }}
              />
            </Animated.View>
          </View>
        )}
      </View>
      <View
        style={{
          width: '100%',
          height: PROGRESS_BAR_HEIGHT,
          backgroundColor: colors.primary,
          opacity: 0.25,
          position: 'absolute',
          bottom: 0,
        }}
      />
      <Animated.View
        style={[
          {
            height: PROGRESS_BAR_HEIGHT,
            backgroundColor: colors.primary,
          },
          progressStyle,
        ]}
      />
      {Object.keys(recipeWithEventDurations)
        .filter((recipeWidthEventDurationKey) => {
          const event = recipeWithEventDurations[recipeWidthEventDurationKey];
          return event.type !== 'finish';
        })
        .map((recipeWidthEventDurationKey) => {
          const _width = isMaxWidth ? styleguide.maxWidth : width;
          const event = recipeWithEventDurations[recipeWidthEventDurationKey];
          const percentOfTotalTime = event.duration / 1000 / totalTime;

          return (
            <View
              key={recipeWidthEventDurationKey}
              style={{
                height: PROGRESS_BAR_HEIGHT,
                width: _width * percentOfTotalTime,
                backgroundColor: colors.primary,
                opacity: 0.35,
                position: 'absolute',
                bottom: 0,
                left: ((Number(recipeWidthEventDurationKey) - 1) / totalTime) * _width,
              }}
            />
          );
        })}
    </View>
  );
}

export default withSettings(StepFunction);
