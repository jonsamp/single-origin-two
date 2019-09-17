import AddGrounds from './images/addgrounds.gif'
import AfterBloom from './images/afterbloom.gif'
import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
import Finish from './images/finish.gif'
import Pour from './images/pour.gif'
import WetFilter from './images/wetfilter.gif'

export default {
  id: 'IcedChemex',
  title: 'Iced Chemex',
  minYield: 320,
  maxYield: 1040,
  defaultGrind: 0.75,
  defaultTotalVolume: 720,
  iced: true,
  defaultSource: Default,
  preparation: [
    {
      text:
        'The chemex filter comes in either a folded square, or a folded triangle, both of which have 4 folds. You will want to separate the fold to form a cone, place 3 folds towards the spout of the chemex, and 1 fold towards the back.',
    },
    {
      image: WetFilter,
      text: 'Rinse the filter with water, then discard the water.',
    },
    {
      text:
        'According to the instructions, add the appropriate amount of ice into the chemex.',
    },
    {
      image: AddGrounds,
      text:
        'Add coffee to the filter inside the chemex, place it on a scale, then zero/tare the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.133,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 0.444,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 60,
      type: 'pour',
      volumePercent: 0.593,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 120,
      type: 'pour',
      volumePercent: 0.815,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 180,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 240,
      type: 'finish',
      image: Finish,
      afterImage: Finish,
    },
  ],
}
