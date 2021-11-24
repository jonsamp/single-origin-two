import Aeropress from './Aeropress';
import Beehouse from './Beehouse';
import Chemex from './Chemex';
import Chemex3Cup from './Chemex3Cup';
import Clever from './Clever';
import EvaSolo from './EvaSolo';
import FrenchPress3Cup from './FrenchPress3Cup';
import FrenchPress4Cup from './FrenchPress4Cup';
import FrenchPress8Cup from './FrenchPress8Cup';
import KalitaWave155 from './KalitaWave155';
import KalitaWave185 from './KalitaWave185';
import V60 from './V60';
import V6001 from './V6001';

import { StepType } from './types';

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

type BrewRecipe = {
  id: string;
  title: string;
  minYield: number;
  maxYield: number;
  defaultGrind: number;
  defaultTotalVolume: number;
  defaultSource: number;
  iced?: boolean;
  preparation: {
    image?: number;
    text: string;
  }[];
  steps: {
    start?: boolean;
    type: StepType;
    volumePercent?: number;
    image: number;
    afterImage: number;
  }[];
};

const recipes: { [i: string]: BrewRecipe } = {
  Aeropress,
  Beehouse,
  Chemex,
  Chemex3Cup,
  Clever,
  EvaSolo,
  FrenchPress3Cup,
  FrenchPress4Cup,
  FrenchPress8Cup,
  KalitaWave185,
  KalitaWave155,
  V60,
  V6001,
};

export default recipes;
