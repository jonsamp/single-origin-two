import { withBloomFn } from '../../../Brew/helpers'
import CleverPour from './images/clever-pour.gif'
import CleverSitting from './images/clever-sitting.gif'
import CleverPourDefault from './images/clever-pour-default.jpg'

export default function recipe({ settings }) {
  const withBloom = withBloomFn({ settings })

  return {
    title: 'Clever',
    minYield: 225,
    maxYield: 450,
    pourEvents: {
      1: [{ type: 'increaseWaterLevel', volumePercent: 0.1549 }, { type: 'updateImage', image: CleverPour }],
      10: [{ type: 'updateImage', image: CleverSitting }],
      [withBloom(-10)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 1,
          countDownTo: withBloom(0),
        },
      ],
      [withBloom(0)]: [{ type: 'increaseWaterLevel', volumePercent: 1 }, { type: 'updateImage', image: CleverPour }],
      [withBloom(10)]: [{ type: 'updateImage', image: CleverSitting }],
      [withBloom(30)]: [
        {
          type: 'tip',
          text:
            'Use the back of a spoon to break the crust on top of the clever.',
          countDownTo: withBloom(40),
        },
      ],
      [withBloom(140)]: [
        {
          type: 'tip',
          text: 'In **seconds**, drain the clever.',
          countDownTo: withBloom(150),
        },
      ],
      [withBloom(150)]: [
        {
          type: 'tip',
          text: 'Drain the clever.',
          countDownTo: withBloom(160),
        },
      ],
      [withBloom(210)]: [
        {
          type: 'tip',
          text: 'In **seconds** the clever should be finished draining.',
          countDownTo: withBloom(220),
        },
      ],
      [withBloom(220)]: [
        {
          type: 'finished',
        },
      ],
    },
    totalVolume: 340,
    totalTime: 220,
    defaultGrind: 0.75,
    pourSourceDefault: CleverPourDefault,
  }
}
