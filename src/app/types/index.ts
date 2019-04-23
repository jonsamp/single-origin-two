import { ReactNode } from 'react'

export interface Theme {
  [color: string]: string
}

export interface UnitHelpers {
  brewedVolumeUnit: UnitHelper
  coffeeWeightUnit: UnitHelper
  waterVolumeUnit: UnitHelper
  temperatureUnit: UnitHelper
  grindUnit: GrindHelper
}

export interface UnitHelper {
  getPreferredValue: (value: number) => number
  getStandardValue: (value: number) => number
  unit: Unit
}

export interface GrindHelper {
  getPreferredValue: (value: number) => number
  getPreferredValueBasedOnPercent: (percent: number) => number
  getStandardValue: (value: number) => number
  getGrindSetting: (
    percent: number
  ) => {
    title: string
    image?: any
  }
  grinder: Grinder
  unit: { symbol: string }
}

export interface Unit {
  title: string
  id: string
  symbol: string
}

export interface Grinder {
  title: string
  shortTitle: string
  id: string
  min: number
  max: number
}

export interface Tip {
  text: string
  countDownTo: number
  template: string
  volumePercent: number
}

export interface PourEvents {
  [second: number]: PourEvent
}

export interface PourEvent {
  type: string
  text: string
  volumePercent: number
  countDownTo: number
}

export interface RecipeConfig {
  title: string
  id: string
  icon: ({ fill: string, size: number }) => ReactNode
}

export interface Recipe {
  title: string
  minYield: number
  maxYield: number
  pourEvents: PourEvents
  totalVolume: number
  totalTime: number
  defaultGrind: number
  pourSource: number
  pourSourceDefault: number
}
