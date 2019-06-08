import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import Card from '../../../../components/Card'
import Image from '../../../../components/Image'
import Instructions from '../../../../components/Instructions'
import formatSeconds from '../../../../helpers/formatSeconds'
import withSettings from '../../../../providers/settings'
import withTheme from '../../../../providers/theme'
import { Theme, UnitHelpers } from '../../../../types/index'
import { withBloomFn } from '../../helpers'
import styles from './styles'
import Timer from './Timer'
import WaterVolume from './WaterVolume'

interface PourTimerProps {
  theme: Theme
  unitHelpers: UnitHelpers
  recipe: any
  settings: any
  volume: number
}

interface PourTimerState {
  second: number
  timerRunning: boolean
  recipe: any
  volumePercent: number
  currentStep: number
}

class PourTimer extends Component<PourTimerProps, PourTimerState> {
  static defaultProps = {
    unitHelpers: {},
    volume: 350,
  }

  state = {
    second: -3,
    timerRunning: false,
    recipe: undefined,
    volumePercent: 0,
    currentStep: 0,
  }

  animatedValue = new Animated.Value(0)

  interval

  formatRecipe = recipe => {
    const withBloom = withBloomFn({ settings: this.props.settings })
    return recipe.steps.reduce((acc, step) => {
      return {
        ...acc,
        ...(step.start ? { 0: step } : { [withBloom(step.second)]: step }),
      }
    }, {})
  }

  componentWillMount() {
    this.setState({
      recipe: this.formatRecipe(this.props.recipe),
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getNextEvent = (offset = 0) => {
    const { recipe, second } = this.state
    return Number(
      Object.keys(recipe).find(time => Number(time) + offset > second)
    )
  }

  getNextStepText = () => {
    const { recipe } = this.state
    const nextStep = recipe[this.getNextEvent(5)]

    if (!nextStep || nextStep.type === 'finished') {
      return 'End of brew'
    }

    if (nextStep.type === 'pour') {
      const {
        volume,
        unitHelpers: { waterVolumeUnit },
      } = this.props

      return `Pour up to **${Math.round(
        waterVolumeUnit.getPreferredValue(volume * nextStep.volumePercent)
      )} ${waterVolumeUnit.unit.title}** of water.`
    }

    if (nextStep.type === 'tip') {
      return nextStep.text
    }
  }

  isDuringStep = () => this.state.second >= this.getNextEvent(5)

  getText = () => {
    const { recipe } = this.props
    const { second, timerRunning } = this.state
    const {
      volume,
      unitHelpers: { waterVolumeUnit },
    } = this.props
    const nextEvent = this.getNextEvent(5)
    const beforeBrewStart = second < 0 && !timerRunning
    const brewCountdown = second < 0 && timerRunning
    const foreshadowNextStep = nextEvent - second > 10
    const countdownToNextStep = nextEvent - second <= 10

    if (beforeBrewStart) {
      return `Over **${formatSeconds(
        recipe.totalTime
      )}**, pour over **${Math.round(
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

  onAnimateNumberBegin = () =>
    Animated.sequence([
      {
        start: onComplete => {
          // Haptic.selection();
          onComplete({ finished: true })
        },
        stop: () => {},
      },
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 200,
      }),
    ]).start()

  onAnimateNumberFinish = () =>
    Animated.sequence([
      {
        start: onComplete => {
          // Haptic.selection();
          onComplete({ finished: true })
        },
        stop: () => {},
      },
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 200,
      }),
    ]).start()

  toggleCountdown = () => {
    if (this.state.timerRunning) {
      deactivateKeepAwake()
      clearInterval(this.interval)
      this.setState({ timerRunning: false })
      return
    }

    activateKeepAwake()
    this.interval = setInterval(() => {
      this.countdown()
      this.trackStepChange()
    }, 1000)
    this.setState({ timerRunning: true })
  }

  trackStepChange = async () => {
    const { recipe, second } = this.state
    const step = recipe[second]

    if (step) {
      if (step.type === 'pour') {
        await this.setState({
          volumePercent: step.volumePercent,
        })
        this.onAnimateNumberBegin()
      }
    }
  }

  countdown = () => {
    this.setState(prev => ({
      second: prev.second + 1,
    }))
  }

  render() {
    const {
      theme,
      volume,
      unitHelpers: { waterVolumeUnit },
    } = this.props
    const { timerRunning, volumePercent, second } = this.state

    return (
      <Card>
        <Instructions text={`${this.getText()}`} />
        <View
          style={{
            opacity: this.isDuringStep() ? 1 : 0.5,
          }}
        >
          <Instructions text={this.getNextStepText()} />
        </View>
        <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
          <Timer
            toggleCountdown={this.toggleCountdown}
            timerRunning={timerRunning}
            second={second}
          />
          <WaterVolume
            animatedValue={this.animatedValue}
            volume={volume * volumePercent}
            waterVolumeUnit={waterVolumeUnit}
            onAnimateNumberFinish={this.onAnimateNumberFinish}
          />
        </View>
      </Card>
    )
  }
}

export default withSettings(withTheme(PourTimer))
