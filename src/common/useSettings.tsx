import { useSelector, useDispatch } from 'react-redux';

import { grinders, getVerboseSetting, GrindRange } from '../constants/grinders';
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
      // TODO: update these to accept a range
      getPreferredValueBasedOnPercent: (percent: number): number => {
        const grinder = grinders[settings.grinderType as keyof typeof grinders];
        const range = grinder.max - grinder.min;
        return Math.round(range * percent);
      },
      getStandardValue: (v: number) => v,
      getGrindSetting: (percent: number) => {
        const { grinderType } = settings;

        if (grinderType === 'generic') {
          return getVerboseSetting(percent);
        }

        const grinder = grinders[grinderType as keyof typeof grinders];
        const range = grinder.max - grinder.min;
        return {
          title: `#${Math.round(range * percent)}`,
          image: null,
        };
      },
      getGrindRange: (range: GrindRange | null) => {
        if (!range) {
          return {};
        }
        const grinder = grinders[settings.grinderType as keyof typeof grinders];

        if (grinder.ranges) {
          const grinderSetting = grinder.ranges[range];

          return {
            title: `between a ${grinderSetting.from} and a ${grinderSetting.to} setting`,
          };
        }
      },
      getPreferredValueBasedOnRange: (range: GrindRange) => {
        const grinder = grinders[settings.grinderType as keyof typeof grinders];

        if (grinder.ranges) {
          const grinderSetting = grinder.ranges[range];

          return Math.round((grinderSetting.from + grinderSetting.to) / 2);
        }
      },
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
