import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import Button from '../../../components/Button';
import { isMaxWidth, height } from '../../../constants/layout';
import withSettings from '../../../providers/settings';
import { logAdded } from '../../../state/logs/actions';
import { selectRecentLog } from '../../../state/logs/selectors';
import { Settings } from '../../../state/settings/types';
import { UnitHelpers } from '../../../types/index';
import AddIce from './AddIce';
import BoilWater from './BoilWater';
import GrindCoffee from './GrindCoffee';
import IceToggle from './IceToggle';
import Notes from './Notes';
import PourTimer from './PourTimer';
import Preparation from './Preparation';
import RecordBrewAttributes from './RecordBrewAttributes';
import YieldQuestion from './YieldQuestion';
import { BrewRecipe } from '../recipes/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation';
import { styleguide } from '../../../constants/themes';
import { State } from '../../../state/types';

interface RecipeProps {
  settings: Settings;
  unitHelpers: UnitHelpers;
  recipe: BrewRecipe;
}

function Recipe(props: RecipeProps) {
  const { recipe, settings, unitHelpers } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const recentLog = useSelector((state: State) => selectRecentLog(state, recipe.id));
  const [recipeState, _setRecipeState] = useState({
    randomKey: 1,
    grind: recentLog.grind,
    temp: recentLog.temp || 205,
    timestamp: new Date().getTime(),
    totalBrewTime: 0,
    attributesRecorded: false,
    totalVolume: recentLog.totalVolume || recipe.defaultTotalVolume,
    isIced: false,
  });

  useEffect(function didMount() {
    activateKeepAwake();

    return function willUnmount() {
      deactivateKeepAwake();
    };
  }, []);

  function setRecipeState({ key, value }: { key: string; value: number | boolean }) {
    _setRecipeState((prevRecipeState) => ({
      ...prevRecipeState,
      [key]: value,
    }));
  }

  function onIsIcedChange(value: boolean) {
    _setRecipeState((prevRecipeState) => ({
      ...prevRecipeState,
      isIced: value,
    }));
  }

  function onFinish() {
    const { timestamp, totalVolume, grind, temp, totalBrewTime, attributesRecorded } = recipeState;
    const log = {
      timestamp,
      totalVolume,
      totalBrewTime,
      ratio: settings.ratio,
      ...(attributesRecorded && settings.recordGrind
        ? {
            grind:
              grind || unitHelpers.grindUnit.getPreferredValueBasedOnPercent(recipe.defaultGrind),
          }
        : null),
      ...(attributesRecorded && settings.recordTemp
        ? {
            temp,
          }
        : null),
      recipeId: recipe.id,
    };

    dispatch(logAdded({ log }));
    setRecipeState({ key: 'randomKey', value: Math.random() });
    navigation.navigate('BrewSummary', { timestamp });
  }

  const { grindUnit, temperatureUnit } = unitHelpers;
  const { minYield, maxYield, defaultGrind } = recipe;
  const { totalVolume, grind, temp } = recipeState;
  const coffeeWeight = Math.round(totalVolume / settings.ratio);
  const totalPourVolume = recipeState.isIced ? Math.round(totalVolume * 0.666) : totalVolume;
  const longestSecond = recipe.steps
    .filter((s) => s.second)
    .map((s) => s.second)
    .sort((a, b) => b - a)[0];

  return (
    <View style={isMaxWidth && { alignItems: 'center' }}>
      <View style={isMaxWidth && { width: styleguide.maxWidth }}>
        <Preparation recipe={recipe.id} preparation={recipe.preparation} />
        <YieldQuestion
          defaultValue={recentLog.totalVolume || recipe.defaultTotalVolume}
          setRecipeState={setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        {recipe.iced && <IceToggle value={recipeState.isIced} onChange={onIsIcedChange} />}
        {recentLog.notes ? <Notes text={recentLog.notes} /> : null}
        <BoilWater volume={totalPourVolume} />
        <GrindCoffee
          coffeeWeight={coffeeWeight}
          defaultGrind={defaultGrind}
          title={recipe.title}
          recentLog={recentLog}
          recipeDuration={longestSecond + settings.bloomDuration}
        />
        {recipeState.isIced && <AddIce volume={Math.round(totalVolume * 0.333)} />}
        <RecordBrewAttributes
          setRecipeState={setRecipeState}
          defaultGrind={defaultGrind}
          grind={grind}
          temp={temp}
          grindUnit={grindUnit}
          temperatureUnit={temperatureUnit}
        />
        <PourTimer
          recipe={recipe}
          volume={totalPourVolume}
          setRecipeState={setRecipeState}
          key={recipeState.randomKey + settings.bloomDuration}
        />
        <Button
          title="Finish Brew"
          customStyle={{
            ...(isMaxWidth
              ? {
                  marginBottom: insets.bottom + 16,
                }
              : {
                  paddingBottom: insets.bottom + height + 4,
                  marginHorizontal: -16,
                  marginBottom: -height,
                }),
          }}
          onPress={onFinish}
          type="tertiary"
        />
      </View>
    </View>
  );
}

export default withSettings(Recipe);
