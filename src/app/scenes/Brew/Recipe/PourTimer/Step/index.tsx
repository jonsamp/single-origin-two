import { thisExpression } from '@babel/types'
import React, { Component, Fragment } from 'react'
import { Animated, View } from 'react-native'
import Button from '../../../../../components/Button'
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

interface StepState {
  nextStepText: string
}

class Step extends Component<StepProps, StepState> {
  state = {
    nextStepText: '',
  }

  animatedValue = new Animated.Value(0)

  getNextEvent = () => {
    const { recipe, second } = this.props
    return Number(Object.keys(recipe).find(time => Number(time) + 5 > second))
  }

  setNextStepText = (nextStepText: string) => {
    if (nextStepText !== this.state.nextStepText) {
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 200,
        }),
        {
          start: async onComplete => {
            await this.setState({ nextStepText })
            onComplete({ finished: true })
          },
          stop: () => {},
        },
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 200,
        }),
      ]).start()
    }
  }

  getNextStepText = () => {
    const { recipe } = this.props
    const nextStep = recipe[this.getNextEvent()]

    if (!nextStep || nextStep.type === 'finished') {
      return this.setNextStepText('End of brew')
    }

    if (nextStep.type === 'pour') {
      const { volume, waterVolumeUnit } = this.props

      return this.setNextStepText(
        `Pour up to **${Math.round(
          waterVolumeUnit.getPreferredValue(volume * nextStep.volumePercent)
        )} ${waterVolumeUnit.unit.title}** of water.`
      )
    }

    if (nextStep.type === 'tip') {
      return this.setNextStepText(nextStep.text)
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
      recipe,
    } = this.props
    const nextEvent = this.getNextEvent()
    const beforeBrewStart = second === -3 && !timerRunning
    const brewCountdown = second < 0 && timerRunning
    const foreshadowNextStep = nextEvent - second > 10
    const countdownToNextStep = nextEvent - second <= 10

    if (beforeBrewStart) {
      return `Over **${formatSeconds(totalTime)}**, pour over **${Math.round(
        waterVolumeUnit.getPreferredValue(volume)
      )} ${waterVolumeUnit.unit.title}** of water.`
    }

    if (this.isDuringStep()) {
      return 'Now'
    }

    if (brewCountdown) {
      return `In **${second * -1}** seconds`
    }

    if (countdownToNextStep) {
      return `In **${nextEvent - second}** seconds`
    }

    if (foreshadowNextStep) {
      const types = {
        pour: 'pour',
        tip: 'step',
      }
      return `Next ${types[recipe[nextEvent].type]} at **${formatSeconds(
        nextEvent
      )}**`
    }

    if (!nextEvent) {
      return ''
    }
  }

  render() {
    const beforeTimerStart =
      !this.props.timerRunning && this.props.second === -3
    this.getNextStepText()
    return (
      <View style={{ minHeight: 92 }}>
        <Instructions text={this.getText()} style={{ paddingBottom: 8 }} />
        {!beforeTimerStart && (
          <Animated.View
            style={{
              opacity: this.animatedValue.interpolate({
                inputRange: [0, 0.5],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  translateY: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 24],
                  }),
                },
              ],
            }}
          >
            <Instructions
              text={this.state.nextStepText}
              style={{ paddingTop: 0, opacity: this.isDuringStep() ? 1 : 0.5 }}
            />
          </Animated.View>
        )}
      </View>
    )
  }
}

export default withTheme(Step)
