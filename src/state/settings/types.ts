export interface Settings {
  theme: 'light' | 'dark'
  ratio: number
  bloomDuration: number
  recordTemp: boolean
  recordGrind: boolean
  grinderType: string
  temperatureUnit: TemperatureUnits
  brewedVolumeUnit: WeightUnits
  coffeeWeightUnit: WeightUnits
  waterVolumeUnit: WeightUnits
  shareTrackingData: boolean
  onboardingVisible: boolean
  submittedRating: boolean
  autoTheme: boolean
  recipes: {
    [i: string]: boolean
  }
}

type WeightUnits = 'grams' | 'ounces' | 'cups'

type TemperatureUnits = 'fahrenheit' | 'celsius'
