import AddGrounds from '../V60/images/addgrounds.png'
import AfterBloom from '../V60/images/afterbloom.gif'
import Finish from '../V60/images/afterfinish.gif'
import AfterPour from '../V60/images/afterpour.gif'
import Bloom from '../V60/images/bloom.gif'
import Default from '../V60/images/default.png'
import Pour from '../V60/images/pour.gif'
import WetFilter from '../V60/images/wetfilter.png'

export default {
  id: 'V6001',
  title: 'V60 #01',
  minYield: 142,
  maxYield: 400,
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
      image: AddGrounds,
      text:
        'Place the filter inside the V60 #01, add the coffee grouds, then place on top of a carafe or mug.',
    },
    {
      text: 'Then put it all on a scale and zero the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.25,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 0.5,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 30,
      type: 'pour',
      volumePercent: 0.75,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 60,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 170,
      type: 'finish',
      image: Finish,
      afterImage: Finish,
    },
  ],
}
