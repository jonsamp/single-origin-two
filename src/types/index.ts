import { ReactNode } from 'react';

export interface Theme {
  foreground: string;
  text: string;
  background: string;
  notification: string;
  primaryDark: string;
  pageBackground: string;
  navigationBackground: string;
  primary: string;
  beige: string;
  warning: string;
  grey1: string;
  grey2: string;
  grey3: string;
  black: string;
  blue: string;
  border: string;
  card: string;
  iconSize: number;
}

export interface UnitHelpers {
  brewedVolumeUnit: UnitHelper;
  coffeeWeightUnit: UnitHelper;
  waterVolumeUnit: UnitHelper;
  temperatureUnit: UnitHelper;
  grindUnit: GrindHelper;
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
}

export interface Unit {
  title: string;
  id: string;
  symbol: string;
}

export interface Grinder {
  title: string;
  shortTitle: string;
  id: string;
  min: number;
  max: number;
}

export interface PourEvents {
  [second: number]: PourEvent;
}

export interface PourEvent {
  type: string;
  text: string;
  volumePercent: number;
  countDownTo: number;
}

export interface RecipeConfig {
  title: string;
  id: string;
  icon: ({ fill: string, size: number }) => ReactNode;
}

export interface Recipe {
  id: string;
  title: string;
  minYield: number;
  maxYield: number;
  defaultGrind: number;
  defaultTotalVolume: number;
  iced: boolean;
  defaultSource: number;
  pourVelocity: number;
  preparation: Array<{
    image?: number;
    text: string;
  }>;
  steps: Array<{
    start?: boolean;
    second?: number;
    type: string;
    volumePercent?: number;
    image?: number;
    afterImage?: number;
  }>;
}

export interface Log {
  timestamp: number;
  totalVolume: number;
  totalBrewTime: number;
  ratio: number;
  recipeId: string;
  grind?: number;
  temp?: number;
  rating?: number;
  tastingNote?: string;
  notes?: string;
}

export interface Logs {
  [i: string]: Log;
}

export interface MenuItem {
  title: string;
  modifier?: string;
  iced?: boolean;
  id: string;
  icon: (props: { fill?: string; size?: number }) => ReactNode;
  image: number;
}
