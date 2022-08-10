import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../../common/theme';
import { useSettings } from '../../../common/useSettings';
import Button from '../../../components/Button';
import { isMaxWidth } from '../../../constants/layout';
import { styleguide } from '../../../constants/themes';
import { RootStackParamList } from '../../../navigation';
import { logAdded } from '../../../state/logs/actions';
import { selectRecentLog } from '../../../state/logs/selectors';
import { State } from '../../../state/types';
import { BrewRecipe } from '../recipes/types';
import AddIce from './AddIce';
import BoilWater from './BoilWater';
import GrindCoffee from './GrindCoffee';
import IceToggle from './IceToggle';
import Notes from './Notes';
import PourTimer from './PourTimer';
import Preparation from './Preparation';
import RecordBrewAttributes from './RecordBrewAttributes';
import YieldQuestion from './YieldQuestion';

interface RecipeProps {
  recipe: BrewRecipe;
}

function Recipe(props: RecipeProps) {
  const { recipe } = props;
  const { settings, unitHelpers } = useSettings();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const tw = useTailwind();
  const recentLog = useSelector((state: State) => selectRecentLog(state, recipe.id));
  const [recipeState, _setRecipeState] = useState({
    randomKey: 1,
    grind: recentLog.grind,
    temp: recentLog.temp ?? 205,
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
              grind ?? unitHelpers.grindUnit.getPreferredValueBasedOnPercent(recipe.defaultGrind),
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

  return (
    <View style={tw(`${isMaxWidth ? 'items-center' : ''}`)}>
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
        <View
          style={[
            tw('bg-quaternary dark:bg-secondary-dark -m-4 p-4'),
            { paddingBottom: insets.bottom },
          ]}>
          <Button title="Finish Brew" onPress={onFinish} type="tertiary" />
        </View>
      </View>
    </View>
  );
}

export default Recipe;
