export enum StepType {
  Pour = 'pour',
  Tip = 'tip',
  Finish = 'finish',
}

export enum BrewRecipeName {
  Aeropress = 'Aeropress',
  Beehouse = 'Beehouse',
  Chemex = 'Chemex',
  Chemex3Cup = 'Chemex3Cup',
  Clever = 'Clever',
  EvaSolo = 'EvaSolo',
  FrenchPress3Cup = 'FrenchPress3Cup',
  FrenchPress4Cup = 'FrenchPress4Cup',
  FrenchPress8Cup = 'FrenchPress8Cup',
  KalitaWave185 = 'KalitaWave185',
  KalitaWave155 = 'KalitaWave155',
  V60 = 'V60',
  V6001 = 'V6001',
}

export type PreparationStep = {
  image?: number;
  text: string;
};

export type BrewStep = {
  start?: boolean;
  type: StepType;
  volumePercent?: number;
  image: number;
  afterImage: number;
  duration?: number;
  text?: string;
  second?: number;
};

export type BrewRecipe = {
  id: BrewRecipeName;
  title: string;
  minYield: number;
  maxYield: number;
  defaultGrind: number;
  defaultTotalVolume: number;
  defaultSource: number;
  iced?: boolean;
  pourVelocity?: number;
  preparation: PreparationStep[];
  steps: BrewStep[];
};
