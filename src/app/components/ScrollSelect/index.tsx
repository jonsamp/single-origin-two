import { range } from 'lodash'
import React, { Component } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { width } from '../../constants/layout'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import styles from './styles'

interface ScrollSelectProps {
  theme: any
  min: number
  max: number
  step: number
  defaultValue: number
  onChange: (value: number) => void
  unitType: string
  unitHelpers: any
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

  scrollViewRef

  xOffset = new Animated.Value(0)
  SCREEN_WIDTH = (width - 24) / 3

  componentDidMount() {
    const { step } = this.props
    const { min, max, defaultValue } = this.encodeValues()

    if (defaultValue === undefined) {
      return
    }

    const selectionRange = range(min, max + 1, step)
    const defaultValueIndex = selectionRange.indexOf(defaultValue)
    const itemPosition = defaultValueIndex * this.SCREEN_WIDTH

    if (this.scrollViewRef) {
      setTimeout(
        () =>
          this.scrollViewRef.scrollTo({
            x: itemPosition,
            y: 0,
            animated: true,
          }),
        0
      )
    }
  }

  onSelectionTap = (index: number) => {
    const itemPosition = index * this.SCREEN_WIDTH

    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({ x: itemPosition, y: 0, animated: true })
    }
  }

  encodeValues = () => {
    const { unitType, min, max, unitHelpers, defaultValue } = this.props
    const unitHelper = unitHelpers[unitType]
    return {
      min: Math.round(unitHelper.getPreferredValue(min)),
      max: Math.round(unitHelper.getPreferredValue(max)),
      defaultValue: Math.round(unitHelper.getPreferredValue(defaultValue)),
    }
  }

  decodeValue = (value: number) => {
    const { unitType, unitHelpers } = this.props
    return unitHelpers[unitType].getStandardValue(value)
  }

  getRanges = (index: number) => [
    index * this.SCREEN_WIDTH - this.SCREEN_WIDTH * 2,
    index * this.SCREEN_WIDTH,
    index * this.SCREEN_WIDTH + this.SCREEN_WIDTH * 2,
  ]

  transitionAnimation = (index: number) => {
    const ranges = this.getRanges(index)
    return {
      opacity: this.xOffset.interpolate({
        inputRange: ranges,
        outputRange: [0, 1, 0],
      }),
    }
  }

  textAnimation = (index: number) => {
    const ranges = this.getRanges(index)
    const translation = this.SCREEN_WIDTH * 0.75

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
            outputRange: ['80deg', '0deg', '-80deg'],
          }),
        },
        {
          translateX: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: [translation, 0, translation * -1],
          }),
        },
      ],
    }
  }

  render() {
    const { theme, onChange, step, unitType, unitHelpers } = this.props
    const { min, max } = this.encodeValues()
    const selectionRange = range(min, max + 1, step)
    const selectionTextStyle = styles.selectionText
    const unitHelper = unitHelpers[unitType]

    return (
      <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.xOffset } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={event => {
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
          ref={ref => {
            if (ref) {
              this.scrollViewRef = ref._component
            }
          }}
        >
          {selectionRange.map((item, index) => (
            <TouchableOpacity
              style={[
                {
                  width: this.SCREEN_WIDTH,
                  alignItems: 'center',
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
            {unitHelper.unit.symbol.toUpperCase()}
          </Text>
        </View>
      </View>
    )
  }
}

export default withSettings(withTheme(ScrollSelect))
