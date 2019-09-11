import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Button from '../../../../../components/Button'
import formatSeconds from '../../../../../helpers/formatSeconds'
import withTheme from '../../../../../providers/theme'
import styles from './styles'

interface TimerProps {
  timerRunning: boolean
  toggleCountdown: () => void
  theme: any
  second: number
}

class Timer extends Component<TimerProps> {
  render() {
    const { toggleCountdown, timerRunning, second } = this.props
    const parts = formatSeconds(second < 0 ? 0 : second).split('')
    return (
      <View style={styles.section}>
        <View style={styles.timeContainer}>
          {parts.map((part, index) => (
            <View
              key={index}
              style={
                part === ':'
                  ? styles.timeTextColonContainer
                  : styles.timeTextContainer
              }
            >
              <Text
                style={[
                  styles.timeText,
                  { color: this.props.theme.foreground },
                ]}
              >
                {part}
              </Text>
            </View>
          ))}
        </View>
        <Button
          type={timerRunning ? 'secondary' : 'primary'}
          title={timerRunning ? 'stop' : 'start'}
          onPress={toggleCountdown}
        />
      </View>
    )
  }
}

export default withTheme(Timer)
