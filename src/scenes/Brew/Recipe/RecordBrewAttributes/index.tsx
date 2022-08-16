import SegmentedControl from '@react-native-community/segmented-control';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../../../common/theme';
import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import Slider from '../../../../components/Slider';
import { GrindRangeName } from '../../../../constants/grinders';

type Props = {
  grind?: number;
  temp: number;
  setRecipeState: (props: { key: string; value: any }) => void;
  grindRangeName: GrindRangeName;
};

function RecordBrewAttributes(props: Props) {
  const { grind, temp, setRecipeState, grindRangeName } = props;
  const { settings, unitHelpers } = useSettings();
  const { grindUnit, temperatureUnit } = unitHelpers;
  const tw = useTailwind();
  const { theme, dark } = useTheme();
  const [state, setState] = useState({
    recordSegmentIndex: 0,
    containerHeight: 0,
  });

  function recordGrindComponent() {
    return (
      <Slider
        label={grindUnit.grinder.id === 'generic' ? 'grinder' : grindUnit.grinder.title}
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={grind ?? grindUnit.getPreferredValueBasedOnRange(grindRangeName)}
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
      </View>
      <View
        style={{
          backgroundColor: theme.background.secondary,
          minHeight: state.containerHeight,
          justifyContent: 'center',
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
    </Card>
  );
}

export default RecordBrewAttributes;
