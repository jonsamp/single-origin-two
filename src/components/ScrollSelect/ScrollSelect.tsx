import * as Haptics from 'expo-haptics'
import { range } from 'lodash'
import React, { Component, createRef } from 'react'
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
} from 'react-native'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import { UnitHelpers } from '../../types'
import styles from './styles'

interface ScrollSelectProps {
  theme: any
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  onChange?: (value: number) => void
  unitType: string
  unitHelpers?: UnitHelpers
  label?: string
  style?: ViewStyle
  containerWidth: number
}

class ScrollSelect extends Component<ScrollSelectProps> {
  static defaultProps = {
    min: 1,
    max: 3,
    step: 1,
    onChange: () => {},
    unitHelpers: {},
    defaultValue: undefined,
  }

  scrollViewRef = createRef<any>()

  xOffset = new Animated.Value(0)
  SCREEN_WIDTH = Math.round(this.props.containerWidth / 3)
  currentPosition = 0

  componentDidMount() {
    const { step } = this.props
    const { min, max, defaultValue } = this.encodeValues()

    if (defaultValue === undefined) {
      return
    }

    const selectionRange = range(min, max + 1, step)
    const defaultValueIndex = selectionRange.indexOf(defaultValue)
    const itemPosition = defaultValueIndex * this.SCREEN_WIDTH

    if (
      this.scrollViewRef &&
      this.scrollViewRef.current &&
      typeof this.scrollViewRef.current.scrollTo === 'function'
    ) {
      setTimeout(
        () =>
          this.scrollViewRef.current.scrollTo({
            x: itemPosition,
            y: 0,
            animated: false,
          }),
        0
      )
    }
  }

  onSelectionTap = (index: number) => {
    const itemPosition = index * this.SCREEN_WIDTH

    if (
      this.scrollViewRef &&
      this.scrollViewRef.current &&
      typeof this.scrollViewRef.current.scrollTo === 'function'
    ) {
      this.scrollViewRef.current.scrollTo({
        x: itemPosition,
        y: 0,
        animated: true,
      })
    }
  }

  encodeValues = () => {
    const { unitType, min, max, unitHelpers, defaultValue } = this.props
    const unitHelper = unitHelpers[unitType]
    return {
      min: unitType ? Math.round(unitHelper.getPreferredValue(min)) : min,
      max: unitType ? Math.round(unitHelper.getPreferredValue(max)) : max,
      defaultValue: unitType
        ? Math.round(unitHelper.getPreferredValue(defaultValue))
        : defaultValue,
    }
  }

  decodeValue = (value: number) => {
    const { unitType, unitHelpers } = this.props
    return unitType ? unitHelpers[unitType].getStandardValue(value) : value
  }

  getRanges = (index: number) => [
    index * this.SCREEN_WIDTH - this.SCREEN_WIDTH,
    index * this.SCREEN_WIDTH,
    index * this.SCREEN_WIDTH + this.SCREEN_WIDTH,
  ]

  transitionAnimation = (index: number) => {
    const ranges = this.getRanges(index)
    return {
      opacity: this.xOffset.interpolate({
        inputRange: ranges,
        outputRange: [0.5, 1, 0.5],
      }),
    }
  }

  textAnimation = (index: number) => {
    const ranges = this.getRanges(index)
    const translation = Math.round(this.SCREEN_WIDTH * (1 / 1.66))

    return {
      transform: [
        {
          scale: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: [1, 1.25, 1],
          }),
        },
        {
          rotate: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: ['45deg', '0deg', '-45deg'],
          }),
        },
        {
          translateX: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: [translation, 0, translation * -1],
            extrapolate: 'extend',
          }),
        },
      ],
    }
  }

  render() {
    const {
      theme,
      onChange,
      step,
      unitType,
      unitHelpers,
      label,
      style,
    } = this.props
    const { min, max } = this.encodeValues()
    const selectionRange = range(min, max + 1, step)
    const selectionTextStyle = styles.selectionText
    const unitHelper = unitHelpers[unitType]

    return (
      <View
        style={[styles.container, { backgroundColor: theme.grey2, ...style }]}
      >
        <Animated.ScrollView
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.xOffset } } }],
            {
              useNativeDriver: true,
              listener: async (event: any) => {
                const { x } = event.nativeEvent.contentOffset

                if (!this.currentPosition) {
                  this.currentPosition = x
                }

                if (
                  Math.abs(x - this.currentPosition) >
                  this.SCREEN_WIDTH - 16
                ) {
                  if (Platform.OS === 'ios') {
                    await Haptics.selectionAsync()
                  }
                  this.currentPosition = x
                }
              },
            }
          )}
          onMomentumScrollEnd={(event) => {
            const selectionNumber = Math.round(
              event.nativeEvent.contentOffset.x / this.SCREEN_WIDTH
            )
            onChange(this.decodeValue(Number(selectionRange[selectionNumber])))
          }}
          horizontal
          contentContainerStyle={{ paddingVertical: this.SCREEN_WIDTH / 3 }}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={this.SCREEN_WIDTH}
          ref={this.scrollViewRef}
        >
          {selectionRange.map((item, index) => (
            <TouchableOpacity
              style={[
                {
                  width: this.SCREEN_WIDTH,
                },
                index === 0 ? { marginLeft: this.SCREEN_WIDTH } : null,
                index === selectionRange.length - 1
                  ? { marginRight: this.SCREEN_WIDTH }
                  : null,
              ]}
              key={item}
              onPress={() => this.onSelectionTap(index)}
              activeOpacity={1}
            >
              <Animated.View style={this.transitionAnimation(index)}>
                <View style={styles.selection}>
                  <Animated.Text
                    style={[
                      selectionTextStyle,
                      this.textAnimation(index),
                      { color: theme.foreground },
                    ]}
                  >
                    {item}
                  </Animated.Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        <View style={[styles.label, { backgroundColor: theme.foreground }]}>
          <Text style={[styles.labelText, { color: theme.grey2 }]}>
            {(unitHelper && unitHelper.unit.symbol.toUpperCase()) || label}
          </Text>
        </View>
      </View>
    )
  }
}

export default withSettings(withTheme(ScrollSelect))
