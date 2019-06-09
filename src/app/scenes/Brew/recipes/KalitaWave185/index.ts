import AfterBloom from './images/afterbloom.gif'
import Finish from './images/afterfinish.gif'
import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
import Draining from './images/draining.gif'
import Pour from './images/pour.gif'

export default {
  title: 'Kalita Wave 185',
  minYield: 150,
  maxYield: 525,
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.1538,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 0.5385,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 10,
      type: 'tip',
      text: 'this is a tip',
    },
    {
      second: 40,
      type: 'pour',
      volumePercent: 0.6923,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 90,
      type: 'pour',
      volumePercent: 0.7923,
      image: Pour,
      afterImage: Draining,
    },
    {
      second: 145,
      type: 'finished',
      volumePercent: 1,
      image: Finish,
      afterImage: Finish,
    },
  ],
  totalTime: 175,
  defaultGrind: 0.5,
  defaultSource: Default,
}
