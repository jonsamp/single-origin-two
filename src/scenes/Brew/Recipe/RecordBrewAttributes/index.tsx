import { iconSize } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import SegmentedControl from '@react-native-community/segmented-control';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Platform, Animated, LayoutAnimation, TouchableOpacity, View } from 'react-native';

import { useTailwind, useTheme } from '../../../../common/theme';
import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import Slider from '../../../../components/Slider';
import { GrindHelper, Unit } from '../../../../state/settings/types';

type Props = {
  grind?: number;
  defaultGrind: number;
  temp: number;
  setRecipeState: (props: { key: string; value: any }) => void;
  temperatureUnit: { unit: Unit };
  grindUnit: GrindHelper;
};

function RecordBrewAttributes(props: Props) {
  const { grind, defaultGrind, temp, setRecipeState, temperatureUnit, grindUnit } = props;
  const { settings, unitHelpers } = useSettings();
  const tw = useTailwind();
  const { theme, dark } = useTheme();
  const [state, setState] = useState({
    recordSegmentIndex: 0,
    isOpen: false,
    containerHeight: 0,
  });
  const animatedRotationValue = useRef(new Animated.Value(0)).current;

  async function toggleIsOpen() {
    const config = LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    );

    LayoutAnimation.configureNext(config);

    if (Platform.OS === 'ios') {
      await Haptics.selectionAsync();
    }

    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));

    if (state.isOpen) {
      setRecipeState({ key: 'attributesRecorded', value: true });
    }

    Animated.spring(animatedRotationValue, {
      toValue: state.isOpen ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }

  function recordGrindComponent() {
    return (
      <Slider
        label={grindUnit.grinder.shortTitle}
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={grind ?? grindUnit.getPreferredValueBasedOnPercent(defaultGrind)}
        onChange={(value) => {
          setRecipeState({
            key: 'grind',
            value: grindUnit.getPreferredValue(value),
          });
        }}
      />
    );
  }

  function recordTempComponent() {
    const min = unitHelpers?.temperatureUnit
      ? Math.round(unitHelpers.temperatureUnit.getPreferredValue(160))
      : 160;
    const max = unitHelpers.temperatureUnit
      ? Math.round(unitHelpers.temperatureUnit.getPreferredValue(220))
      : 220;
    const defaultValue = unitHelpers.temperatureUnit
      ? Math.round(unitHelpers.temperatureUnit.getPreferredValue(temp))
      : temp;

    return (
      <Slider
        key={temperatureUnit.unit.id}
        min={min}
        max={max}
        label={temperatureUnit.unit.title}
        defaultValue={defaultValue}
        onChange={(value) => {
          setRecipeState({
            key: 'temp',
            value: unitHelpers?.temperatureUnit.getStandardValue(value),
          });
        }}
      />
    );
  }

  const { recordSegmentIndex } = state;

  if (!settings.recordGrind && !settings.recordTemp) {
    return null;
  }

  const recordSettings = [];
  let instructions;
  if (settings.recordGrind) {
    recordSettings.push('grind');
    instructions = 'Record your grind setting.';
  }
  if (settings.recordTemp) {
    recordSettings.push('temperature');
    instructions = 'Record your water temperature.';
  }

  if (settings.recordTemp && settings.recordGrind) {
    instructions = 'Record your grind setting and water temperature.';
  }

  return (
    <Card>
      <View style={tw('flex-row justify-between items-center')}>
        <View style={tw('flex-1')}>
          {instructions && <Instructions text={instructions} icon="RecordIcon" />}
        </View>
        <TouchableOpacity
          onPress={toggleIsOpen}
          style={[
            tw('p-1 rounded-md mr-5 theme.border.default border'),
            {
              backgroundColor: theme.button.secondary.background,
            },
          ]}
          activeOpacity={1}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animatedRotationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg'],
                  }),
                },
              ],
            }}>
            <Feather
              name="chevron-down"
              size={iconSize.regular}
              color={theme.button.secondary.foreground}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {state.isOpen ? (
        <View
          style={{
            backgroundColor: theme.background.secondary,
            minHeight: state.containerHeight,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setState((prevState) => ({ ...prevState, containerHeight: height }));
          }}>
          {recordSettings.length > 1 && (
            <View style={tw('px-4 mt-4')}>
              <SegmentedControl
                backgroundColor={
                  dark
                    ? Platform.select({ android: '#212121' })
                    : Platform.select({ android: '#dddddd' })
                }
                appearance={dark ? 'dark' : 'light'}
                values={recordSettings.map((name) => name.charAt(0).toUpperCase() + name.slice(1))}
                selectedIndex={recordSegmentIndex}
                onValueChange={(value) => {
                  setState((prevState) => ({
                    ...prevState,
                    recordSegmentIndex: value === 'Temperature' ? 1 : 0,
                  }));
                }}
              />
              <View>
                {recordSegmentIndex === 0 ? recordGrindComponent() : null}
                {recordSegmentIndex === 1 ? recordTempComponent() : null}
              </View>
            </View>
          )}
          {recordSettings.length === 1
            ? recordSettings.includes('grind')
              ? recordGrindComponent()
              : recordTempComponent()
            : null}
        </View>
      ) : null}
    </Card>
  );
}

export default RecordBrewAttributes;
