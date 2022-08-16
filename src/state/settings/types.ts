import { GrindRange } from '../../constants/grinders';

export enum WeightUnits {
  Grams = 'grams',
  Ounces = 'ounces',
  Cups = 'cups',
}

export enum TemperatureUnits {
  Fahrenheit = 'fahrenheit',
  Celsius = 'celsius',
}

export interface Settings {
  ratio: number;
  bloomDuration: number;
  recordTemp: boolean;
  recordGrind: boolean;
  grinderType: string;
  temperatureUnit: TemperatureUnits;
  brewedVolumeUnit: WeightUnits;
  coffeeWeightUnit: WeightUnits;
  waterVolumeUnit: WeightUnits;
  submittedRating: boolean;
  recipes: {
    [i: string]: boolean;
  };
}

export interface UnitHelper {
  getPreferredValue: (value: number) => number;
  getStandardValue: (value: number) => number;
  unit: Unit;
}

export interface GrindHelper {
  getPreferredValue: (value: number) => number;
  getPreferredValueBasedOnPercent: (percent: number) => number;
  getStandardValue: (value: number) => number;
  getGrindSetting: (percent: number) => {
    title: string;
    image?: any;
  };
  grinder: Grinder;
  unit: { symbol: string };
  getPreferredValueBasedOnRange: (grindRange: GrindRange) => number;
}

export interface Unit {
  title: string;
  id: string;
  symbol: string;
}

interface Grinder {
  title: string;
  shortTitle: string;
  id: string;
  min: number;
  max: number;
}
