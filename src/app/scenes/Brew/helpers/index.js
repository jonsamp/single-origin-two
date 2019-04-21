import playSound from '@app/helpers/playSound'
import addWaterSound from '@app/scenes/Brew/sounds/add-water.mp3'
import tipSound from '@app/scenes/Brew/sounds/tip.mp3'
import endBrewSound from '@app/scenes/Brew/sounds/end-brew.mp3'
import warningSound from '@app/scenes/Brew/sounds/warning.mp3'

export const formatTipText = ({
  text,
  secondsLeft,
  volumePercent,
  totalVolume,
  waterVolumeUnit,
}) => {
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
}) => {
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

  if (!currentEvents) return

  currentEvents.forEach(event => {
    switch (event.type) {
      case 'increaseWaterLevel':
        playSound({ sound: addWaterSound })
        setState({ key: 'volumePercent', value: event.volumePercent })
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

export const getValueUnit = (unitType, value) =>
  `${unitType.getPreferredValue(value)} ${unitType.unit.title}`

export const withBloomFn = ({ settings }) => duration =>
  settings.bloomDuration + duration
