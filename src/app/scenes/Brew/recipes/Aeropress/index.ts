// import AddGrounds from './images/add-grounds.jpg'
// import AfterBloom from './images/afterbloom.gif'
// import AfterDrain from './images/afterdrain.gif'
// import AfterPour from './images/afterpour.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
// import Drain from './images/drain.gif'
import Pour from './images/pour.gif'
import Press from './images/press.gif'
// import WetFilter from './images/wet-filter.jpg'

export default {
  id: 'Aeropress',
  title: 'Aeropress',
  minYield: 180,
  maxYield: 300,
  defaultGrind: 0.3,
  defaultTotalVolume: 240,
  defaultSource: Default,
  preparation: [
    {
      // image: WetFilter,
      text:
        'Insert the plunger about 1cm into the brew chamber and set on the scale in the inverted/upside-down position. Add the ground coffee to the aeropress.',
    },
    {
      // image: AddGrounds,
      text:
        'Once the coffee is brewing, you\'ll add the filter and cap to the aeropress.',
    },
    {
      text:
        'As the brew finishes, you\'ll carefully flip the entire brew onto a carafe or mug. Firmly but gently press down for 30 seconds, until all of the coffee has been pressed out of the Aeropress.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.182,
      image: Bloom,
      afterImage: Bloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: Pour,
    },
    {
      second: 65,
      type: 'tip',
      text: 'Attach the cap and filter.',
      duration: 10000,
      // image: Drain,
      // afterImage: AfterDrain,
    },
    {
      second: 75,
      type: 'tip',
      text: 'Plunge the aeropress.',
      duration: 30000,
      image: Press,
      afterImage: Press,
    },
    {
      second: 105,
      type: 'finish',
      // image: AfterDrain,
      // afterImage: AfterDrain,
    },
  ],
}
