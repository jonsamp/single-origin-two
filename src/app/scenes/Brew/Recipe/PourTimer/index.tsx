import * as Haptics from 'expo-haptics'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import Card from '../../../../components/Card'
import Image from '../../../../components/Image'
import { height, width } from '../../../../constants/layout'
import playSound from '../../../../helpers/playSound'
import withSettings from '../../../../providers/settings'
import withTheme from '../../../../providers/theme'
import { Settings } from '../../../../state/settings/types'
import { Recipe } from '../../../../types'
import { Theme, UnitHelpers } from '../../../../types/index'
import { withBloomFn } from '../../helpers'
import addWaterSound from '../../sounds/add-water.mp3'
import tipSound from '../../sounds/tip.mp3'
import Step from './Step'
import styles from './styles'
import Timer from './Timer'
import WaterVolume from './WaterVolume'

interface PourTimerProps {
  theme: Theme
  unitHelpers: UnitHelpers
  recipe: Recipe
  settings: Settings
  volume: number
  setRecipeState: (props: any) => {}
}

interface PourTimerState {
  second: number
  timerRunning: boolean
  recipe: any
  volumePercent: number
  image: number
}

class PourTimer extends Component<PourTimerProps, PourTimerState> {
  static defaultProps = {
    unitHelpers: {},
  }

  state = {
    second: -3,
    timerRunning: false,
    recipe: undefined,
    volumePercent: 0,
    image: this.props.recipe.defaultSource,
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
      if (step.image) {
        this.setState({
          image: step.image,
        })
      }

      if (step.afterImage) {
        setTimeout(() => {
          this.setState({
            image: step.afterImage,
          })
        }, 5000)
      }

      if (step.type === 'pour') {
        await this.setState({
          volumePercent: step.volumePercent,
        })
        playSound({ sound: addWaterSound })
        this.onAnimateNumberBegin()
      }

      if (step.type === 'tip') {
        Animated.sequence([
          Animated.timing(this.shadowAnimatedValue, {
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(this.shadowAnimatedValue, {
            toValue: 0,
            duration: 200,
          }),
          Animated.timing(this.shadowAnimatedValue, {
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(this.shadowAnimatedValue, {
            toValue: 0,
            duration: 200,
          }),
        ]).start()
        playSound({ sound: tipSound })
      }
    }
  }

  countdown = async () => {
    await this.setState(prev => ({
      second: prev.second + 1,
    }))
    this.props.setRecipeState({
      key: 'totalBrewTime',
      value: this.state.second,
    })
  }

  render() {
    const {
      theme,
      volume,
      unitHelpers: { waterVolumeUnit },
    } = this.props
    const { recipe, timerRunning, volumePercent, second, image } = this.state

    return (
      <View>
        <View style={{ left: -16, width: width + 32 }}>
          <Image
            source={image}
            defaultSource={this.props.recipe.defaultSource}
            isPlaying={timerRunning}
            style={{
              height: height / 4,
            }}
          />
        </View>
        <Animated.View
          style={{
            shadowColor: this.shadowAnimatedValue.interpolate({
              inputRange: [0, 0.5],
              outputRange: [theme.black, theme.primary],
              extrapolate: 'clamp',
            }),
            shadowRadius: this.shadowAnimatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 4],
            }),
            shadowOffset: { height: 6, width: 0 },
            shadowOpacity: this.shadowAnimatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
            top: -24,
          }}
        >
          <Card containerStyle={{ shadowOpacity: 0 }}>
            <Step
              recipe={recipe}
              second={second}
              volume={volume}
              waterVolumeUnit={waterVolumeUnit}
              timerRunning={timerRunning}
              totalTime={Math.max(...Object.keys(recipe).map(n => Number(n)))}
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
      </View>
    )
  }
}

export default withSettings(withTheme(PourTimer))
