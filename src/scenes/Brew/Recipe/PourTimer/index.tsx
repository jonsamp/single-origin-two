import React, { useRef, useState, useEffect } from 'react';
import { Animated, View } from 'react-native';

import Card from '../../../../components/Card';
import Image from '../../../../components/Image';
import { height, width } from '../../../../constants/layout';
import playSound from '../../../../helpers/playSound';
import withSettings from '../../../../providers/settings';
import { useTheme, Styleguide, Theme } from '../../../../providers/theme';
import { Settings } from '../../../../state/settings/types';
import { Recipe, UnitHelpers } from '../../../../types';
import { withBloomFn } from '../../helpers';
import addWaterSound from '../../sounds/add-water.mp3';
import tipSound from '../../sounds/tip.mp3';
import Step from './Step';
import Timer from './Timer';
import WaterVolume from './WaterVolume';
import styles from './styles';

type Props = {
  unitHelpers: UnitHelpers;
  recipe: Recipe;
  settings: Settings;
  volume: number;
  setRecipeState: (props: any) => void;
};

function formatRecipe(recipe, settings) {
  const withBloom = withBloomFn({ settings });
  return recipe.steps.reduce((acc, step) => {
    return {
      ...acc,
      ...(step.start ? { 0: step } : { [withBloom(step.second)]: step }),
    };
  }, {});
}

function PourTimerFunction(props: Props) {
  const { unitHelpers, recipe, settings, volume, setRecipeState } = props;
  const { colors, styleguide } = useTheme();
  const interval = useRef<NodeJS.Timeout>();
  const [timerRunning, setTimerRunning] = useState(false);
  const [second, setSecond] = useState(-3);
  const [volumePercent, setVolumePercent] = useState(0);
  const [currentStepDuration, setCurrentStepDuration] = useState(5);
  const [image, setImage] = useState(recipe.defaultSource);
  const _recipe = formatRecipe(recipe, settings);

  useEffect(function didMount() {
    return interval.current && clearInterval(interval.current);
  }, []);

  function toggleCountdown() {
    if (timerRunning) {
      if (interval) {
        clearInterval(interval.current);
      }
      setTimerRunning(false);
    } else {
      interval.current = setInterval(() => {
        setSecond((prevState) => prevState + 1);
      }, 1000);
      setTimerRunning(true);
    }
  }

  useEffect(
    function trackStepChange() {
      const step = _recipe[second];

      setRecipeState({
        key: 'totalBrewTime',
        value: second,
      });

      if (step) {
        let lengthOfStep;
        if (step.duration) {
          lengthOfStep = step.duration;
        } else if (step.volumePercent) {
          const volumePercentDifference = step.volumePercent - volumePercent;
          const volumeToAdd = volumePercentDifference * volume;

          // 130 is default pour velocity
          // 750 is adding 1/4 of a second so the animation of the pour tracker has time to finish
          lengthOfStep = volumeToAdd * (recipe.pourVelocity || 130) + 250;
        } else {
          lengthOfStep = 5000;
        }

        if (step.image) {
          setImage(step.image);
        }

        if (step.afterImage) {
          setTimeout(() => {
            setImage(step.afterImage);
          }, lengthOfStep);
        }

        if (step.type === 'pour') {
          setCurrentStepDuration(Math.round(lengthOfStep / 1000));
          setVolumePercent(step.volumePercent);
          playSound({ sound: addWaterSound });
        }

        if (step.type === 'tip') {
          setCurrentStepDuration(5);
          playSound({ sound: tipSound });
        }
      }
    },
    [second]
  );

  const maxWidth = width > styleguide.maxWidth ? styleguide.maxWidth : width;

  return (
    <View>
      <View
        style={{
          left: -16,
          width: maxWidth + 32,
          borderRadius: maxWidth >= styleguide.maxWidth ? 4 : 0,
          overflow: 'hidden',
        }}>
        <Image
          source={image}
          defaultSource={recipe.defaultSource}
          isPlaying={timerRunning}
          style={{
            height: height / 4,
          }}
        />
      </View>
      <View style={{ top: -24 }}>
        <Card containerStyle={{ shadowOpacity: 0.2, elevation: 5 }}>
          <Step
            recipe={_recipe}
            second={second}
            volume={volume}
            timerRunning={timerRunning}
            currentStepDuration={currentStepDuration}
            pourVelocity={recipe.pourVelocity}
          />
          <View style={[styles.container, { backgroundColor: colors.grey2 }]}>
            <Timer toggleCountdown={toggleCountdown} timerRunning={timerRunning} second={second} />
            <WaterVolume
              volume={volume * volumePercent}
              waterVolumeUnit={unitHelpers.waterVolumeUnit}
              pourVelocity={recipe.pourVelocity}
            />
          </View>
        </Card>
      </View>
    </View>
  );
}

export default withSettings(PourTimerFunction);
