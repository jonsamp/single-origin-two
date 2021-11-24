import AddGrounds from './images/add-grounds.jpg';
import AfterBloom from './images/afterbloom.gif';
import Finish from './images/afterfinish.gif';
import AfterPour from './images/afterpour.gif';
import Bloom from './images/bloom.gif';
import Default from './images/default.jpg';
import Draining from './images/draining.gif';
import Pour from './images/pour.gif';
import WetFilter from './images/wet-filter.jpg';

import { StepType, BrewRecipeName } from '../types';

export default {
  id: BrewRecipeName.KalitaWave185,
  title: 'Kalita Wave 185',
  minYield: 100,
  maxYield: 700,
  defaultGrind: 0.5,
  defaultTotalVolume: 340,
  defaultSource: Default,
  iced: true,
  preparation: [
    {
      image: WetFilter,
      text: 'Rinse the entire filter with hot water, then discard the excess water.',
    },
    {
      image: AddGrounds,
      text: 'Place the filter inside the Kalita Wave, add the coffee grouds, then place on top of a carafe or mug.',
    },
    {
      text: 'Then put it all on a scale and zero the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: StepType.Pour,
      volumePercent: 0.1538,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: StepType.Pour,
      volumePercent: 0.5385,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 40,
      type: StepType.Pour,
      volumePercent: 0.6923,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 65,
      type: StepType.Pour,
      volumePercent: 0.7923,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 90,
      type: StepType.Pour,
      volumePercent: 1,
      image: Pour,
      afterImage: Draining,
    },
    {
      second: 145,
      type: StepType.Finish,
      image: Finish,
      afterImage: Finish,
    },
  ],
};
