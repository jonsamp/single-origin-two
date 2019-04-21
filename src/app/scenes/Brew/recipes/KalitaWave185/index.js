import { withBloomFn } from '@app/scenes/Brew/helpers'
import KalitaWavePour from './images/kalita-wave-pour.gif'
import KalitaWavePourDefault from './images/kalita-wave-pour-default.jpg'

export default function recipe({ settings }) {
  const withBloom = withBloomFn({ settings })

  return {
    title: 'Kalita Wave 185',
    minYield: 150,
    maxYield: 525,
    pourEvents: {
      1: [{ type: 'increaseWaterLevel', volumePercent: 0.1538 }],
      [withBloom(-10)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.5385,
          countDownTo: withBloom(0),
        },
      ],
      [withBloom(0)]: [{ type: 'increaseWaterLevel', volumePercent: 0.5385 }],
      [withBloom(30)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.6923,
          countDownTo: withBloom(40),
        },
      ],
      [withBloom(40)]: [{ type: 'increaseWaterLevel', volumePercent: 0.6923 }],
      [withBloom(55)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.8462,
          countDownTo: withBloom(65),
        },
      ],
      [withBloom(65)]: [{ type: 'increaseWaterLevel', volumePercent: 0.8462 }],
      [withBloom(80)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 1,
          countDownTo: withBloom(90),
        },
      ],
      [withBloom(90)]: [{ type: 'increaseWaterLevel', volumePercent: 1 }],
      [withBloom(135)]: [
        {
          type: 'tip',
          text: 'In **seconds** the kalita wave should be finished draining.',
          countDownTo: withBloom(145),
        },
      ],
      [withBloom(145)]: [
        {
          type: 'finished',
        },
      ],
    },
    totalVolume: 325,
    totalTime: 175,
    defaultGrind: 0.5,
    pourSource: KalitaWavePour,
    pourSourceDefault: KalitaWavePourDefault,
  }
}
