import AddGrounds from './images/addgrounds.jpg'
import AfterBloom from './images/afterbloom.gif'
import Finish from './images/afterfinish.gif'
import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
import Draining from './images/draining.gif'
import Pour from './images/pour.gif'
import WetFilter from './images/wetfilter.jpg'

export default {
  id: 'V60',
  title: 'V60',
  minYield: 142,
  maxYield: 567,
  defaultGrind: 0.5,
  defaultTotalVolume: 340,
  defaultSource: Default,
  preparation: [
    {
      image: WetFilter,
      text:
        'Rinse the entire filter with hot water, then discard the excess water.',
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