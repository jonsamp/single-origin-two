import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import React, { Component } from 'react'
import { Animated, Text, TextStyle, View } from 'react-native'
import AnimateNumber from 'react-native-animate-number'
import Button from '../../../../components/Button'
import Card from '../../../../components/Card'
import Image from '../../../../components/Image'
import Instructions from '../../../../components/Instructions'
import formatSeconds from '../../../../helpers/formatSeconds'
import withSettings from '../../../../providers/settings'
import withTheme from '../../../../providers/theme'
import { Theme, UnitHelpers } from '../../../../types/index'
import { withBloomFn } from '../../../Brew/helpers'
import styles from './styles'

interface PourTimerProps {
  theme: Theme
  unitHelpers: UnitHelpers
  recipe: any
  settings: any
}

interface PourTimerState {
  second: number
  timerRunning: boolean
  recipe: any
}

class PourTimer extends Component<PourTimerProps, PourTimerState> {
  static defaultProps = {
    unitHelpers: {},
  }

  state = {
    second: -3,
    timerRunning: false,
    recipe: undefined,
  }

  // trackingAnimatedValue = new Animated.Value(0)

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

  getNextEvent = () => {
    const { recipe, second } = this.state
    return Object.keys(recipe).find(time => Number(time) + 5 > second)
  }

  getText = () => {
    const { second, recipe } = this.state
    const nextEvent = Number(this.getNextEvent())

    if (second < 0) {
      return `start in ${second * -1}`
    }

    if (nextEvent === undefined) {
      return 'finished!'
    }

    const type = recipe[nextEvent].type

    if (second < nextEvent && nextEvent - second <= 10) {
      return `${type} in ${nextEvent - second} seconds`
    } else if (second < nextEvent) {
      return `next step to ${type} at ${nextEvent}`
    } else {
      return `${type} now!`
    }
  }

  // onAnimateNumberBegin = () =>
  //   Animated.sequence([
  //     {
  //       start: onComplete => {
  //         // Haptic.selection();
  //         onComplete({ finished: true })
  //       },
  //       stop: () => {},
  //     },
  //     Animated.timing(this.trackingAnimatedValue, {
  //       toValue: 1,
  //       duration: 200,
  //     }),
  //   ]).start()

  // onAnimateNumberFinish = () =>
  //   Animated.sequence([
  //     {
  //       start: onComplete => {
  //         // Haptic.selection();
  //         onComplete({ finished: true })
  //       },
  //       stop: () => {},
  //     },
  //     Animated.timing(this.trackingAnimatedValue, {
  //       toValue: 0,
  //       duration: 200,
  //     }),
  //   ]).start()

  toggleCountdown = () => {
    if (this.state.timerRunning) {
      deactivateKeepAwake()
      clearInterval(this.interval)
      this.setState({ timerRunning: false })
      return
    }

    activateKeepAwake()
    this.interval = setInterval(this.countdown, 1000)
    this.setState({ timerRunning: true })
  }

  countdown = () => {
    this.setState(prev => ({
      second: prev.second + 1,
    }))
  }

  renderTimePart = (part: string) => (
    <Text
      style={
        [styles.timeText, { color: this.props.theme.foreground }] as TextStyle
      }
    >
      {part}
    </Text>
  )

  renderTimer = () => {
    const { second } = this.state
    const parts = formatSeconds(second < 0 ? 0 : second).split('')

    return (
      <View style={{ flexDirection: 'row' }}>
        {parts.map((part, index) => (
          <View
            key={index}
            style={
              part === ':'
                ? styles.timeTextColonContainer
                : styles.timeTextContainer
            }
          >
            {this.renderTimePart(part)}
          </View>
        ))}
      </View>
    )
  }

  render() {
    const { timerRunning, recipe } = this.state
    return (
      <Card>
        {this.renderTimer()}
        <Instructions text={`${Object.keys(recipe)}`} />
        <Instructions text={this.getText()} />
        <Button
          type={timerRunning ? 'secondary' : 'primary'}
          title={timerRunning ? 'stop' : 'start'}
          onPress={this.toggleCountdown}
        />
      </Card>
    )

    // const { theme, unitHelpers } = this.props
    // const { waterVolumeUnit } = unitHelpers
    // const { timerRunning } = this.state
    // const inputRange = [0, 1]
    // const trackingAnimatedScale = this.trackingAnimatedValue.interpolate({
    //   inputRange,
    //   outputRange: [1, 1.25],
    // })
    // const trackingAnimatedShadow = this.trackingAnimatedValue.interpolate({
    //   inputRange,
    //   outputRange: [0, 1],
    // })
    // const trackingAnimatedBorder = this.trackingAnimatedValue.interpolate({
    //   inputRange,
    //   outputRange: [theme.grey3, theme.primary],
    // })
    // const trackingAnimatedBackground = this.trackingAnimatedValue.interpolate({
    //   inputRange,
    //   outputRange: [theme.background, theme.primary],
    // })
    // const trackingAnimatedText = this.trackingAnimatedValue.interpolate({
    //   inputRange,
    //   outputRange: [theme.foreground, theme.background],
    // })
    //
    // return (
    //   <Card>
    //     <Image
    //       source={source}
    //       defaultSource={defaultSource}
    //       isPlaying={this.state.timerRunning}
    //     />
    //     <Instructions
    //       text={`Pour a total of **${Math.round(
    //         waterVolumeUnit.getPreferredValue(totalVolume)
    //       )} ${
    //         waterVolumeUnit.unit.title
    //       }** of water over the next **${formatSeconds(
    //         totalTime
    //       )}** with the pour timer.`}
    //     />
    //     <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
    //       <View style={styles.section}>
    //         {this.renderTimer()}
    //         <Button
    //           type={timerRunning ? 'secondary' : 'primary'}
    //           title={timerRunning ? 'stop' : 'start'}
    //           onPress={this.toggleCountdown}
    //         />
    //       </View>
    //       <View style={styles.section}>
    //         <Text
    //           style={
    //             [styles.labelText, { color: theme.foreground }] as TextStyle
    //           }
    //         >
    //           POUR UP TO
    //         </Text>
    //         <Animated.View
    //           style={[
    //             styles.trackingContainer,
    //             {
    //               backgroundColor: trackingAnimatedBackground,
    //               transform: [{ scale: trackingAnimatedScale }],
    //               borderColor: trackingAnimatedBorder,
    //               shadowOpacity: trackingAnimatedShadow,
    //             },
    //           ]}
    //         >
    //           <View style={styles.setWidthText}>
    //             <Animated.Text
    //               style={[styles.trackingText, { color: trackingAnimatedText }]}
    //             >
    //               <AnimateNumber
    //                 value={waterVolumeUnit.getPreferredValue(
    //                   totalWaterWeight * waterPercent
    //                 )}
    //                 formatter={val =>
    //                   parseFloat(val).toFixed(
    //                     waterVolumeUnit.unit.symbol === 'g'
    //                       ? 0
    //                       : waterVolumeUnit.unit.symbol === 'oz'
    //                         ? 1
    //                         : 2
    //                   )
    //                 }
    //                 countBy={
    //                   waterVolumeUnit.unit.symbol === 'g'
    //                     ? 4
    //                     : waterVolumeUnit.unit.symbol === 'oz'
    //                       ? 0.1
    //                       : 0.01
    //                 }
    //                 interval={waterVolumeUnit.unit.symbol === 'g' ? 30 : 60}
    //                 onFinish={this.onAnimateNumberFinish}
    //               />
    //             </Animated.Text>
    //           </View>
    //           <Animated.Text
    //             style={[
    //               styles.trackingLabelText,
    //               { color: trackingAnimatedText },
    //             ]}
    //           >
    //             {waterVolumeUnit.unit.title}
    //           </Animated.Text>
    //         </Animated.View>
    //       </View>
    //     </View>
    //   </Card>
    // )
  }
}

export default withSettings(withTheme(PourTimer))
