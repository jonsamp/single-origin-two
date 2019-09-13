// import AddGrounds from './images/add-grounds.jpg'
// import AfterBloom from './images/afterbloom.gif'
// import Finish from './images/afterfinish.gif'
import AfterPour from './images/afterpour.gif'
import Default from './images/default.jpg'
// import Bloom from './images/bloom.gif'
// import Draining from './images/draining.gif'
import Pour from './images/pour.gif'
// import WetFilter from './images/wet-filter.jpg'

export default {
  id: 'Clever',
  title: 'Clever',
  minYield: 142,
  maxYield: 516,
  totalTime: 175,
  defaultGrind: 0.75,
  defaultTotalVolume: 340,
  defaultSource: Default,
  pourVelocity: 65,
  preparation: [
    {
      // image: WetFilter,
      text:
        'Place the filter inside the clever, rinse with water, then release the excess water.',
    },
    {
      // image: AddGrounds,
      text:
        'Add the coffee grouds to the clever, then place on top of a scale, then zero/tare the scale.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.153,
      // image: Bloom,
      // afterImage: AfterBloom,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 45,
      type: 'tip',
      text: 'Stir the clever',
      image: Pour,
      afterImage: AfterPour,
    },
    {
      second: 150,
      type: 'finish',
      // image: Finish,
      // afterImage: Finish,
      image: Pour,
      afterImage: AfterPour,
    },
  ],
}
