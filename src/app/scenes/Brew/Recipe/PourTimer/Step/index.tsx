import React, { Component, Fragment } from 'react'
import { View } from 'react-native'
import Instructions from '../../../../../components/Instructions'
import formatSeconds from '../../../../../helpers/formatSeconds'
import withTheme from '../../../../../providers/theme'
import styles from './styles'

interface StepProps {
  recipe: any
  second: number
  volume: number
  waterVolumeUnit: any
  timerRunning: boolean
  totalTime: number
}

class Step extends Component<StepProps> {
  getNextEvent = () => {
    const { recipe, second } = this.props
    return Number(Object.keys(recipe).find(time => Number(time) + 5 > second))
  }

  getNextStepText = () => {
    const { recipe } = this.props
    const nextStep = recipe[this.getNextEvent()]

    if (!nextStep || nextStep.type === 'finished') {
      return 'End of brew'
    }

    if (nextStep.type === 'pour') {
      const { volume, waterVolumeUnit } = this.props

      return `Pour up to **${Math.round(
        waterVolumeUnit.getPreferredValue(volume * nextStep.volumePercent)
      )} ${waterVolumeUnit.unit.title}** of water.`
    }

    if (nextStep.type === 'tip') {
      return nextStep.text
    }
  }

  isDuringStep = () => this.props.second >= this.getNextEvent()

  getText = () => {
    const {
      totalTime,
      second,
      timerRunning,
      volume,
      waterVolumeUnit,
    } = this.props
    const nextEvent = this.getNextEvent()
    const beforeBrewStart = second < 0 && !timerRunning
    const brewCountdown = second < 0 && timerRunning
    const foreshadowNextStep = nextEvent - second > 10
    const countdownToNextStep = nextEvent - second <= 10

    if (beforeBrewStart) {
      return `Over **${formatSeconds(totalTime)}**, pour over **${Math.round(
        waterVolumeUnit.getPreferredValue(volume)
      )} ${waterVolumeUnit.unit.title}** of water.`
    }

    if (this.isDuringStep()) {
      return `Now`
    }

    if (brewCountdown) {
      return `In **${second * -1}** seconds`
    }

    if (countdownToNextStep) {
      return `In **${nextEvent - second}** seconds`
    }

    if (foreshadowNextStep) {
      return `Next step at **${formatSeconds(nextEvent)}**`
    }

    if (!nextEvent) {
      return ''
    }
  }

  render() {
    return (
      <Fragment>
        <Instructions text={`${this.getText()}`} />
        <View
          style={{
            opacity: this.isDuringStep() ? 1 : 0.5,
          }}
        >
          <Instructions text={this.getNextStepText()} />
        </View>
      </Fragment>
    )
  }
}

export default withTheme(Step)
