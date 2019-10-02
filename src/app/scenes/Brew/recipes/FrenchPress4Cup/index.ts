import AddGrounds from '../FrenchPress3Cup/images/addgrounds.jpg'
import AfterBloom from '../FrenchPress3Cup/images/afterbloom.gif'
import AttachLid from '../FrenchPress3Cup/images/attachlid.gif'
import Bloom from '../FrenchPress3Cup/images/bloom.gif'
import Default from '../FrenchPress3Cup/images/default.jpg'
import Finish from '../FrenchPress3Cup/images/finish.gif'
import Pour from '../FrenchPress3Cup/images/pour.gif'
import Press from '../FrenchPress3Cup/images/press.gif'
import PressTheFrench from '../FrenchPress3Cup/images/press.jpg'

export default {
  id: 'FrenchPress4Cup',
  title: 'French Press 4 Cup',
  minYield: 288,
  maxYield: 640,
  defaultGrind: 0.85,
  defaultTotalVolume: 432,
  pourVelocity: 40,
  defaultSource: Default,
  preparation: [
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
