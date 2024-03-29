import { GrindRangeName } from '../../../../constants/grinders';
import { StepType, BrewRecipeName } from '../types';
import AfterBloom from './images/afterbloom.gif';
import AfterPour from './images/afterpour.gif';
import AfterPress from './images/afterpress.gif';
import AttachLid from './images/attachlid.gif';
import Bloom from './images/bloom.gif';
import Default from './images/default.jpg';
import Finish from './images/finish.gif';
import Pour from './images/pour.gif';
import Press from './images/press.gif';

export default {
  id: BrewRecipeName.Aeropress,
  title: 'Aeropress',
  minYield: 180,
  maxYield: 300,
  grindRangeName: GrindRangeName.FINE,
  defaultTotalVolume: 240,
  defaultSource: Default,
  preparation: [
    {
      text: 'Insert the plunger about 1cm into the brew chamber and set on the scale in the inverted/upside-down position. Add the ground coffee to the aeropress.',
    },
    {
      text: "Once the coffee is brewing, you'll add the filter and cap to the aeropress.",
    },
    {
      text: "As the brew finishes, you'll carefully flip the entire brew onto a carafe or mug. Firmly but gently press down for 30 seconds, until all of the coffee has been pressed out of the Aeropress.",
    },
  ],
  steps: [
    {
      start: true,
      type: StepType.Pour,
      volumePercent: 0.182,
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
      second: 65,
      type: StepType.Tip,
      text: 'Attach the cap and filter.',
      duration: 10000,
      image: AttachLid,
      afterImage: AttachLid,
    },
    {
      second: 75,
      type: StepType.Tip,
      text: 'Plunge the aeropress.',
      duration: 30000,
      image: Press,
      afterImage: AfterPress,
    },
    {
      second: 105,
      type: StepType.Finish,
      image: Finish,
      afterImage: Finish,
    },
  ],
};
