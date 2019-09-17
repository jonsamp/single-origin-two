import AddGrounds from './images/addgrounds.png'
import AfterBloom from './images/afterbloom.gif'
import Finish from './images/afterfinish.gif'
import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.png'
import Pour from './images/pour.gif'
import WetFilter from './images/wetfilter.png'

export default {
  id: 'IcedV60',
  title: 'Iced V60',
  minYield: 142,
  maxYield: 567,
  defaultGrind: 0.5,
  defaultTotalVolume: 340,
  defaultSource: Default,
  iced: true,
  preparation: [
    {
      image: WetFilter,
      text:
        'Rinse the entire filter with hot water, then discard the excess water.',
    },
    {
      text:
        'According to the instructions, add the appropriate amount of ice into the carafe or mug.',
    },
    {
      image: AddGrounds,
      text:
        'Place the filter inside the V60, add the coffee grouds, then place on top of a carafe or mug.',
    },
    {
      text: 'Then put it all on a scale and zero the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.118,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 0.412,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 45,
      type: 'pour',
      volumePercent: 0.706,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 90,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 150,
      type: 'finish',
      image: Finish,
      afterImage: Finish,
    },
  ],
}
