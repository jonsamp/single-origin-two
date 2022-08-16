import { GrindRange } from '../../../../constants/grinders';
import AddGrounds from '../Chemex/images/addgrounds.gif';
import AfterBloom from '../Chemex/images/afterbloom.gif';
import AfterPour from '../Chemex/images/afterpour.gif';
import Bloom from '../Chemex/images/bloom.gif';
import Default from '../Chemex/images/default.jpg';
import Finish from '../Chemex/images/finish.gif';
import Pour from '../Chemex/images/pour.gif';
import WetFilter from '../Chemex/images/wetfilter.gif';
import { StepType, BrewRecipeName } from '../types';

export default {
  id: BrewRecipeName.Chemex3Cup,
  title: 'Chemex 3 Cup',
  minYield: 120,
  maxYield: 550,
  grindRange: GrindRange.MEDIUM,
  defaultTotalVolume: 360,
  defaultSource: Default,
  iced: true,
  preparation: [
    {
      text: 'The chemex filter comes in either a folded square, or a folded triangle, both of which have 4 folds. You will want to separate the fold to form a cone, place 3 folds towards the spout of the chemex, and 1 fold towards the back.',
    },
    {
      image: WetFilter,
      text: 'Rinse the filter with water, then discard the water.',
    },
    {
      image: AddGrounds,
      text: 'Add coffee to the filter inside the chemex, place it on a scale, then zero/tare the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: StepType.Pour,
      volumePercent: 0.256,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: StepType.Pour,
      volumePercent: 0.513,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 60,
      type: StepType.Pour,
      volumePercent: 0.769,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 120,
      type: StepType.Pour,
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 180,
      type: StepType.Finish,
      image: Finish,
      afterImage: Finish,
    },
  ],
};
