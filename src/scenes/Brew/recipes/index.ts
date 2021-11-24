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

import { BrewRecipe } from './types';

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
