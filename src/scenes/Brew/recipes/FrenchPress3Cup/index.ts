import AddGrounds from './images/addgrounds.jpg'
import AfterBloom from './images/afterbloom.gif'
import AttachLid from './images/attachlid.gif'
import Bloom from './images/bloom.gif'
import Default from './images/default.jpg'
import Finish from './images/finish.gif'
import Pour from './images/pour.gif'
import Press from './images/press.gif'
import PressTheFrench from './images/press-tutorial.jpg'

export default {
  id: 'FrenchPress3Cup',
  title: 'French Press 3 Cup',
  minYield: 200,
  maxYield: 352,
  defaultGrind: 0.85,
  defaultTotalVolume: 272,
  defaultSource: Default,
  pourVelocity: 40,
  preparation: [
    {
      text:
        'Warm the french press with some hot water, then discard the water before beginning your brew.',
    },
    {
      image: AddGrounds,
      text: 'Add coffee grounds to the french press',
    },
    {
      image: PressTheFrench,
      text:
        'After the coffee has finished brewing, connect the lid, press the coffee, and pour the coffee immediately into a carafe or mug. Do not leave the brewed coffee in the french press after pressing.',
    },
  ],
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.182,
      image: Bloom,
      afterImage: AfterBloom,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 1,
      image: Pour,
      afterImage: AttachLid,
    },
    {
      second: 210,
      type: 'tip',
      text: 'Press the french press.',
      duration: 15000,
      image: Press,
      afterImage: Press,
    },
    {
      second: 225,
      type: 'finish',
      image: Finish,
      afterImage: Finish,
    },
  ],
}
