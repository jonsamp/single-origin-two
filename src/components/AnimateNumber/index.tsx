import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Timer from 'react-timer-mixin'

const HALF_RAD = Math.PI / 2

type Props = {
  countBy?: number
  interval?: number
  steps?: number
  value?: number
  timing?: 'linear' | 'easeOut' | 'easeIn' | ((a: number, b: number) => number)
  formatter?: (a: string) => any
  onProgress?: (a: number, b: number) => {}
  onFinish?: (a: number, b: number) => {}
  startAt?: number
  initialValue?: number
  textStyle?: any
}

type State = {
  value?: number
  displayValue?: number
}

export default class AnimateNumber extends Component<Props, State> {
  dirty
  startFrom
  endWith: number
  direction

  static defaultProps = {
    interval: 14,
    timing: 'linear',
    steps: 45,
    value: 0,
    initialValue: 0,
    formatter: val => val,
    onFinish: () => {},
  }

  static TimingFunctions = {
    linear: (interval: number, progress: number): number => {
      return interval
    },

    easeOut: (interval: number, progress: number): number => {
      return interval * Math.sin(HALF_RAD * progress) * 5
    },

    easeIn: (interval: number, progress: number): number => {
      return interval * Math.sin(HALF_RAD - HALF_RAD * progress) * 5
    },
  }

  constructor(props: any) {
    super(props)
    // default values of state and non-state variables
    this.state = {
      value: props.initialValue,
      displayValue: props.formatter(props.initialValue),
    }
    this.dirty = false
    this.startFrom = 0
    this.endWith = 0
  }

  componentDidMount() {
    this.startFrom = this.state.value
    this.endWith = this.props.value
    this.dirty = true
    setTimeout(() => {
      this.startAnimate()
    }, this.props.startAt != null ? this.props.startAt : 0)
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // check if start an animation
    if (this.props.value !== nextProps.value) {
      this.startFrom = this.props.value
      this.endWith = nextProps.value
      this.dirty = true
      this.startAnimate()
      return
    }
    // Check if iterate animation frame
    if (!this.dirty) {
      return
    }
    if (this.direction === true) {
      if (
        parseFloat(String(this.state.value)) <=
        parseFloat(String(this.props.value))
      ) {
        this.startAnimate()
      }
    } else if (this.direction === false) {
      if (
        parseFloat(String(this.state.value)) >=
        parseFloat(String(this.props.value))
      ) {
        this.startAnimate()
      }
    }
  }

  render() {
    const parts = this.state.displayValue.toString().split('')
    console.log(parts)
    return (
      <View style={styles.timeContainer}>
        {parts.map((part, index) => (
          <View style={styles.timeTextContainer} key={`${part}-${index}`}>
            <Animated.Text style={this.props.textStyle}>{part}</Animated.Text>
          </View>
        ))}
      </View>
    )
  }

  startAnimate() {
    let progress = this.getAnimationProgress()

    Timer.setTimeout(() => {
      let value = (this.endWith - this.startFrom) / this.props.steps
      let sign = value >= 0 ? 1 : -1
      if (this.props.countBy) value = sign * Math.abs(this.props.countBy)
      let total =
        parseFloat(String(this.state.value)) + parseFloat(String(value))

      this.direction = value > 0
      // animation terminate conditions
      // @ts-ignore
      if ((this.direction ^ (total <= this.endWith)) === 1) {
        this.dirty = false
        total = this.endWith
        this.props.onFinish(total, this.props.formatter(String(total)))
      }

      if (this.props.onProgress) this.props.onProgress(this.state.value, total)

      this.setState({
        value: total,
        displayValue: this.props.formatter(String(total)),
      })
    }, this.getTimingFunction(this.props.interval, progress))
  }

  getAnimationProgress(): number {
    return (this.state.value - this.startFrom) / (this.endWith - this.startFrom)
  }

  getTimingFunction(interval: number, progress: number) {
    if (typeof this.props.timing === 'string') {
      let fn = AnimateNumber.TimingFunctions[this.props.timing]
      return fn(interval, progress)
    } else if (typeof this.props.timing === 'function')
      return this.props.timing(interval, progress)
    else return AnimateNumber.TimingFunctions['linear'](interval, progress)
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTextContainer: {
    width: 19,
    alignItems: 'center',
  },
})
