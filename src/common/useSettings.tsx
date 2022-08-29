import { useSelector, useDispatch } from 'react-redux';

import { grinders, GrindRangeName } from '../constants/grinders';
import { units } from '../constants/units';
import { settingUpdated } from '../state/settings/actions';
import { selectSettings } from '../state/settings/selectors';

export function useSettings() {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  const conversions = {
    grams: {
      preferredConversion: (value: number) => Math.round(value),
      standardConversion: (value: number) => Math.round(value),
    },
    fahrenheit: {
      preferredConversion: (value: number) => Math.round(value),
      standardConversion: (value: number) => Math.round(value),
    },
    celsius: {
      preferredConversion: (value: number) => Math.round((value - 32) / 1.8),
      standardConversion: (value: number) => Math.round(value * 1.8 + 32),
    },
    ounces: {
      preferredConversion: (value: number) => (value * 0.035274).toFixed(1),
      standardConversion: (value: number) => Math.round(value / 0.035274),
    },
    cups: {
      preferredConversion: (value: number) => (value * 0.01).toFixed(2),
      standardConversion: (value: number) => Math.round(value / 0.01),
    },
  };

  function getUnitHelper(unit: string) {
    return {
      getPreferredValue: getPreferredValue(unit),
      getStandardValue: getStandardValue(unit),
      unit: units[settings[unit as keyof typeof settings] as keyof typeof units],
    };
  }

  function getGrindHelper() {
    return {
      getPreferredValue: (v: number) => v,
      getPreferredValueBasedOnRange: (grindRangeName: GrindRangeName): number => {
        const grinder = grinders[settings.grinderType as keyof typeof grinders];
        const grindRange = grinder.ranges[grindRangeName];
        const average = (grindRange.from + grindRange.to) / 2;
        return Math.floor(average);
      },
      getStandardValue: (v: number) => v,
      grinder: grinders[settings.grinderType as keyof typeof grinders],
      unit: { symbol: 'grind' },
    };
  }

  function getPreferredValue(unit: string) {
    return function getPreferredValueInner(value: number) {
      return Number(
        conversions[
          settings[unit as keyof typeof settings] as keyof typeof units
        ].preferredConversion(Number(value))
      );
    };
  }

  function getStandardValue(unit: string) {
    return function getStandardValueInner(value: number) {
      return conversions[
        settings[unit as keyof typeof settings] as keyof typeof units
      ].standardConversion(value);
    };
  }

  return {
    settings,
    settingUpdated: (args: { key: string; value: any }) => dispatch(settingUpdated(args)),
    unitHelpers: {
      brewedVolumeUnit: getUnitHelper('brewedVolumeUnit'),
      coffeeWeightUnit: getUnitHelper('coffeeWeightUnit'),
      waterVolumeUnit: getUnitHelper('waterVolumeUnit'),
      temperatureUnit: getUnitHelper('temperatureUnit'),
      grindUnit: getGrindHelper(),
    },
  };
}
