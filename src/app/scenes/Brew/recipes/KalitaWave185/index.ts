// import { withBloomFn } from '../../../../scenes/Brew/helpers'
// import KalitaWavePourDefault from './images/kalita-wave-pour-default.jpg'
// import KalitaWavePour from './images/kalita-wave-pour.gif'

export default {
  title: 'Kalita Wave 185',
  minYield: 150,
  maxYield: 525,
  steps: [
    {
      start: true,
      type: 'pour',
      volumePercent: 0.1538,
    },
    {
      second: 0,
      type: 'pour',
      volumePercent: 0.5385,
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
    },
    {
      second: 90,
      type: 'pour',
      volumePercent: 0.7923,
    },
    {
      second: 145,
      type: 'finished',
      volumePercent: 1,
    },
  ],
  totalVolume: 325,
  totalTime: '2:55',
  defaultGrind: 0.5,
}
