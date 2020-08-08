import React, { Component } from 'react'
import { Animated, Text, View } from 'react-native'
import AnimateNumber from '../../../../../components/AnimateNumber'
import withTheme from '../../../../../providers/theme'
import styles from './styles'

interface WaterVolumeProps {
  theme: any
  animatedValue: Animated.Value
  volume: number
  waterVolumeUnit: any
  onAnimateNumberFinish: () => {}
  pourVelocity?: number
}

class WaterVolume extends Component<WaterVolumeProps> {
  render() {
    const {
      theme,
      animatedValue,
      volume,
      waterVolumeUnit,
      onAnimateNumberFinish,
      pourVelocity,
    } = this.props
    const inputRange = [0, 1]
    const trackingAnimatedScale = animatedValue.interpolate({
      inputRange,
      outputRange: [1, 1.2],
    })
    const trackingAnimatedShadow = animatedValue.interpolate({
      inputRange,
      outputRange: [0, 1],
    })
    const trackingAnimatedElevation = animatedValue.interpolate({
      inputRange,
      outputRange: [0, 10],
    })
    const trackingAnimatedBorder = animatedValue.interpolate({
      inputRange,
      outputRange: [theme.grey3, theme.primary],
    })
    const trackingAnimatedBackground = animatedValue.interpolate({
      inputRange,
      outputRange: [theme.background, theme.primary],
    })
    const trackingAnimatedText = animatedValue.interpolate({
      inputRange,
      outputRange: [theme.foreground, theme.background],
    })
    return (
      <View style={styles.section}>
        <Text style={[styles.labelText, { color: theme.foreground }]}>
          WATER VOLUME
        </Text>
        <Animated.View
          style={[
            styles.trackingContainer,
            {
              backgroundColor: trackingAnimatedBackground,
              transform: [{ scale: trackingAnimatedScale }],
              borderColor: trackingAnimatedBorder,
              shadowOpacity: trackingAnimatedShadow,
              elevation: trackingAnimatedElevation,
            },
          ]}
        >
          <View style={styles.setWidthText}>
            <AnimateNumber
              textStyle={[styles.trackingText, { color: trackingAnimatedText }]}
              value={waterVolumeUnit.getPreferredValue(volume)}
              formatter={val =>
                parseFloat(val).toFixed(
                  waterVolumeUnit.unit.symbol === 'g'
                    ? 0
                    : waterVolumeUnit.unit.symbol === 'oz'
                      ? 1
                      : 2
                )
              }
              countBy={
                waterVolumeUnit.unit.symbol === 'g'
                  ? 1
                  : waterVolumeUnit.unit.symbol === 'oz'
                    ? 0.1
                    : 0.01
              }
              interval={pourVelocity || 130}
              onFinish={onAnimateNumberFinish}
            />
          </View>
          <Animated.Text
            style={[styles.trackingLabelText, { color: trackingAnimatedText }]}
          >
            {waterVolumeUnit.unit.title}
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

export default withTheme(WaterVolume)
