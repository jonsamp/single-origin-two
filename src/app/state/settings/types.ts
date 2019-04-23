export interface Settings {
  theme: 'light' | 'dark'
  restoreLastBrew: boolean
  ratio: number
  bloomDuration: number
  reminders: boolean
  recordTemp: boolean
  recordGrind: boolean
  grinderType: string
  temperatureUnit: TemperatureUnits
  brewedVolumeUnit: WeightUnits
  coffeeWeightUnit: WeightUnits
  waterVolumeUnit: WeightUnits
  soundsEnabled: boolean
  shareTrackingData: boolean
  recipes: {
    [i: string]: boolean
  }
}

type WeightUnits = 'grams' | 'ounces' | 'cups'

type TemperatureUnits = 'fahrenheit' | 'celsius'
