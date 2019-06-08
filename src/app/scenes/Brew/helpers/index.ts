import playSound from '../../../helpers/playSound'
import addWaterSound from '../../../scenes/Brew/sounds/add-water.mp3'
import endBrewSound from '../../../scenes/Brew/sounds/end-brew.mp3'
import tipSound from '../../../scenes/Brew/sounds/tip.mp3'
import warningSound from '../../../scenes/Brew/sounds/warning.mp3'
import { Settings } from '../../../state/settings/types'
import { Tip } from '../../../types/index'

interface TipTextProps {
  text: string
  secondsLeft: number
  volumePercent: number
  totalVolume: number
  waterVolumeUnit: WaterVolumeUnit
}

interface HandleTickProps {
  pourEvents: object
  second: number
  tip: Tip
  setState: (props: { key: string; value: any }) => void
  totalVolume: number
  waterVolumeUnit: WaterVolumeUnit
}

interface WaterVolumeUnit {
  getPreferredValue: (volume: number) => number
  unit: {
    title: string
  }
}

export const formatTipText = ({
  text,
  secondsLeft,
  volumePercent,
  totalVolume,
  waterVolumeUnit,
}: TipTextProps) => {
  const { getPreferredValue, unit } = waterVolumeUnit
  const value = getPreferredValue(volumePercent * totalVolume)

  return text
    .replace('**seconds**', `${secondsLeft} seconds`)
    .replace('**grams**', `${value} ${unit.title}`)
}

export const handleTick = ({
  pourEvents,
  second,
  tip,
  setState,
  totalVolume,
  waterVolumeUnit,
}: HandleTickProps) => {
  const currentEvents = pourEvents[second]

  if (tip.text) {
    if (tip.countDownTo === second) {
      setState({ key: 'tip', value: { text: null } })
    } else {
      setState({
        key: 'tip',
        value: {
          ...tip,
          text: formatTipText({
            text: tip.template,
            secondsLeft: tip.countDownTo - second,
            volumePercent: tip.volumePercent,
            totalVolume,
            waterVolumeUnit,
          }),
        },
      })
    }
  }

  if (!currentEvents) {
    return
  }

  currentEvents.forEach(event => {
    switch (event.type) {
      case 'increaseWaterLevel':
        playSound({ sound: addWaterSound })
        setState({ key: 'volumePercent', value: event.volumePercent })
        break
      case 'updateImage':
        setState({ key: 'image', value: event.image })
        break
      case 'tip':
        playSound({ sound: tipSound })
        setState({
          key: 'tip',
          value: {
            template: event.text,
            text: formatTipText({
              text: event.text,
              secondsLeft: event.countDownTo - second,
              volumePercent: event.volumePercent,
              totalVolume,
              waterVolumeUnit,
            }),
            volumePercent: event.volumePercent,
            countDownTo: event.countDownTo,
          },
        })
        break
      case 'finished':
        playSound({ sound: endBrewSound })
        break
      case 'warning':
        playSound({ sound: warningSound })
        setState({ key: 'warningText', value: event.text })
        break
      default:
    }
  })
}

export const getValueUnit = (unitType: any, value: number) =>
  `${unitType.getPreferredValue(value)} ${unitType.unit.title}`

export const withBloomFn = (props: { settings: Settings }) => (
  duration: number
) => props.settings.bloomDuration + duration
