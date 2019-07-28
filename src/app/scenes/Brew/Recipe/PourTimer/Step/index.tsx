import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import Instructions from '../../../../../components/Instructions'
import formatSeconds from '../../../../../helpers/formatSeconds'
import withTheme from '../../../../../providers/theme'

interface StepProps {
  recipe: any
  second: number
  volume: number
  waterVolumeUnit: any
  timerRunning: boolean
  totalTime: number
  currentStepDuration: number
}

interface StepState {
  nextStepText: string
  stepKey: number
}

class Step extends Component<StepProps, StepState> {
  state = {
    nextStepText: '',
    stepKey: 0,
  }

  animatedValue = new Animated.Value(0)

  componentDidMount() {
    this.getNextStepText()
  }

  async componentDidUpdate(prevProps) {
    if (
      // try updating the event/next step text every second tick
      prevProps.second !== this.props.second ||
      // update the text/event when the volume changes from the yield question
      prevProps.volume !== this.props.volume
    ) {
      await this.getNextEvent(this.props.second)
      this.getNextStepText()
    }
  }

  getNextEvent = async second => {
    const { recipe, currentStepDuration } = this.props

    const result = Number(
      Object.keys(recipe).find(time => {
        return Number(time) + currentStepDuration > second
      })
    )

    if (this.state.stepKey < result) {
      await this.setState({ stepKey: result })
    }
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
    const nextStep = recipe[this.state.stepKey]

    if (!nextStep || nextStep.type === 'finish') {
      return this.setNextStepText('End of brew.')
    }

    if (nextStep.type === 'pour') {
      const { volume, waterVolumeUnit } = this.props

      return this.setNextStepText(
        `Pour up to **${waterVolumeUnit.getPreferredValue(
          volume * nextStep.volumePercent
        )} ${waterVolumeUnit.unit.title}** of water.`
      )
    }

    if (nextStep.type === 'tip') {
      return this.setNextStepText(nextStep.text)
    }
  }

  isDuringStep = () => this.props.second >= this.state.stepKey

  getText = () => {
    const {
      second,
      timerRunning,
      volume,
      waterVolumeUnit,
      recipe,
      totalTime,
    } = this.props
    const nextEvent = this.state.stepKey
    const beforeBrewStart = second === -3 && !timerRunning
    const brewCountdown = second < 0 && timerRunning
    const foreshadowNextStep = nextEvent - second > 10
    const countdownToNextStep = nextEvent - second <= 10

    if (beforeBrewStart) {
      return `Over **${formatSeconds(
        totalTime
      )}**, pour over **${waterVolumeUnit.getPreferredValue(volume)} ${
        waterVolumeUnit.unit.title
      }** of water. Press **Start** to begin.`
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
        pour: 'Next pour',
        tip: 'Next step',
        finish: 'Brew will finish',
      }
      return `${types[recipe[nextEvent].type] ||
        'Next step'} at **${formatSeconds(nextEvent)}**`
    }

    if (!nextEvent) {
      return ''
    }
  }

  render() {
    const beforeTimerStart =
      !this.props.timerRunning && this.props.second === -3

    return (
      <View style={{ minHeight: 100, justifyContent: 'center' }}>
        <View>
          <Instructions
            text={this.getText()}
            style={{ paddingBottom: 0, top: -8 }}
          />
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
                style={{
                  paddingTop: 0,
                  opacity: this.isDuringStep() ? 1 : 0.4,
                }}
                textStyle={{
                  fontSize: 20,
                }}
              />
            </Animated.View>
          )}
        </View>
      </View>
    )
  }
}

export default withTheme(Step)
