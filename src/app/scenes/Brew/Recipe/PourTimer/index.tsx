import * as Haptics from 'expo-haptics'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import Card from '../../../../components/Card'
import Image from '../../../../components/Image'
import withSettings from '../../../../providers/settings'
import withTheme from '../../../../providers/theme'
import { Theme, UnitHelpers } from '../../../../types/index'
import { withBloomFn } from '../../helpers'
import Step from './Step'
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
  shadowAnimatedValue = new Animated.Value(0)

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

  onAnimateNumberBegin = () =>
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 200,
    }).start()

  onAnimateNumberFinish = () =>
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200,
    }).start()

  toggleCountdown = () => {
    Haptics.selectionAsync()

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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      Animated.sequence([
        Animated.timing(this.shadowAnimatedValue, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.shadowAnimatedValue, {
          toValue: 0,
          duration: 500,
        }),
      ]).start()

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
    const { recipe, timerRunning, volumePercent, second } = this.state

    return (
      <Animated.View
        style={{
          shadowColor: this.shadowAnimatedValue.interpolate({
            inputRange: [0, 0.5],
            outputRange: [theme.black, theme.primary],
            extrapolate: 'clamp',
          }),
          shadowRadius: this.shadowAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 16],
          }),
          shadowOffset: { height: 6, width: 0 },
          shadowOpacity: this.shadowAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 0.8],
          }),
        }}
      >
        <Card style={{ shadowOpacity: 0 }}>
          <Step
            recipe={recipe}
            second={second}
            volume={volume}
            waterVolumeUnit={waterVolumeUnit}
            timerRunning={timerRunning}
            totalTime={this.props.recipe.totalTime}
          />
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
      </Animated.View>
    )
  }
}

export default withSettings(withTheme(PourTimer))
