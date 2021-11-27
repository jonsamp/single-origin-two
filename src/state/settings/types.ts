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
  shareTrackingData: boolean;
  onboardingVisible: boolean;
  submittedRating: boolean;
  recipes: {
    [i: string]: boolean;
  };
}
