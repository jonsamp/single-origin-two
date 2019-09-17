import AddGrounds from './images/add-grounds.jpg'
import AfterBloom from './images/afterbloom.gif'
import Finish from './images/afterfinish.gif'
import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
import Draining from './images/draining.gif'
import Pour from './images/pour.gif'
import WetFilter from './images/wet-filter.jpg'

export default {
  id: 'KalitaWave155',
  title: 'Kalita Wave 155',
  minYield: 142,
  maxYield: 400,
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
        'Place the filter inside the Kalita Wave 155, add the coffee grouds, then place on top of a carafe or mug.',
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
      afterImage: Draining,
    },
    {
      second: 170,
      type: 'finish',
      image: Finish,
      afterImage: Finish,
    },
  ],
}
