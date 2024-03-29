import { GrindRangeName } from '../../../../constants/grinders';
import { StepType, BrewRecipeName } from '../types';
import AddGrounds from './images/addgrounds.png';
import AddWater from './images/addwater.gif';
import AttachSleeve from './images/attachsleeve.gif';
import Default from './images/default.png';
import Finish from './images/finish.gif';
import RemoveLid from './images/removelid.png';
import Serve from './images/serve.gif';
import Stir from './images/stir.gif';
import Wait from './images/wait.gif';

export default {
  id: BrewRecipeName.EvaSolo,
  title: 'Eva Solo',
  minYield: 288,
  maxYield: 640,
  grindRangeName: GrindRangeName.MEDIUM_COARSE,
  defaultTotalVolume: 432,
  defaultSource: Default,
  pourVelocity: 40,
  preparation: [
    {
      image: RemoveLid,
      text: 'Remove the lid and filter from the top of the eva solo.',
    },
    {
      image: AddGrounds,
      text: 'Add coffee grounds to the glass carafe of the eva solo.',
    },
    {
      text: 'After you pour hot water over the grounds during the brew process, attach the lid. Then be ready to pour the coffee immediately into a carafe or mug. Do not leave the brewed coffee in the eva solo after brewing is completed.',
    },
  ],
  steps: [
    {
      start: true,
      type: StepType.Pour,
      volumePercent: 1,
      image: AddWater,
      afterImage: AddWater,
    },
    {
      second: 15,
      type: StepType.Tip,
      text: 'Stir the grounds inside the carafe.',
      duration: 15000,
      image: Stir,
      afterImage: Stir,
    },
    {
      second: 45,
      type: StepType.Tip,
      text: 'Attach sleeve and lid.',
      duration: 15000,
      image: AttachSleeve,
      afterImage: Wait,
    },
    {
      second: 210,
      type: StepType.Tip,
      text: 'Pour the coffee into a mug.',
      duration: 15000,
      image: Serve,
      afterImage: Serve,
    },
    {
      second: 225,
      type: StepType.Finish,
      image: Finish,
      afterImage: Finish,
    },
  ],
};
