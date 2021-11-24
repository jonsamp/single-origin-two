import AddGrounds from './images/add-grounds.jpg';
import AfterBloom from './images/afterbloom.gif';
import AfterDrain from './images/afterdrain.gif';
import AfterPour from './images/afterpour.gif';
import Bloom from './images/bloom.gif';
import Default from './images/default.jpg';
import Drain from './images/drain.gif';
import Pour from './images/pour.gif';
import WetFilter from './images/wet-filter.jpg';

import { StepType, BrewRecipeName } from '../types';

export default {
  id: BrewRecipeName.Clever,
  title: 'Clever',
  minYield: 142,
  maxYield: 516,
  defaultGrind: 0.75,
  defaultTotalVolume: 340,
  defaultSource: Default,
  preparation: [
    {
      image: WetFilter,
      text: 'Place the filter inside the clever, rinse with water, then release the excess water.',
    },
    {
      image: AddGrounds,
      text: 'Add the coffee grouds to the clever, then place on top of a scale, then zero/tare the scale.',
    },
    {
      text: "After the clever has finished brewing, you'll need a carafe or mug to drain the clever's coffee into.",
    },
  ],
  steps: [
    {
      start: true,
      type: StepType.Pour,
      volumePercent: 0.153,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: StepType.Pour,
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 135,
      type: StepType.Tip,
      text: 'Drain the clever into a mug or carafe',
      duration: 15000,
      image: Drain,
      afterImage: AfterDrain,
    },
    {
      second: 150,
      type: StepType.Finish,
      image: AfterDrain,
      afterImage: AfterDrain,
    },
  ],
};
