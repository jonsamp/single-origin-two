import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Haptic } from 'expo';
import { range } from 'lodash';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import { width } from 'constants/layout';
import styles from './styles';

const SCREEN_WIDTH = width / 3;

class ScrollSelect extends Component {
  static propTypes = {
    theme: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    unitType: PropTypes.string,
    unitHelpers: PropTypes.object,
  };

  static defaultProps = {
    min: 1,
    max: 3,
    step: 1,
    onChange: () => {},
    unitHelpers: {},
    defaultValue: null,
  };

  componentDidMount() {
    const { min, max, step, defaultValue } = this.encodeValues();
    if (!defaultValue) return;

    const selectionRange = range(min, max, step);
    const defaultValueIndex = selectionRange.indexOf(defaultValue);
    const itemPosition = defaultValueIndex * SCREEN_WIDTH;

    if (this.scrollViewRef) {
      setTimeout(
        () =>
          this.scrollViewRef.scrollTo({
            x: itemPosition,
            y: 0,
            animated: false,
          }),
        0
      );
    }
  }

  onSelectionTap = index => {
    const itemPosition = index * SCREEN_WIDTH;

    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({ x: itemPosition, y: 0, animated: true });
    }
  };

  encodeValues = () => {
    const { unitType, min, max, unitHelpers, defaultValue } = this.props;
    const unitHelper = unitHelpers[unitType];
    return {
      min: Math.round(unitHelper.getPreferredValue(min)),
      max: Math.round(unitHelper.getPreferredValue(max)),
      defaultValue: Math.round(unitHelper.getPreferredValue(defaultValue)),
    };
  };

  decodeValue = value => {
    const { unitType, unitHelpers } = this.props;
    return unitHelpers[unitType].getStandardValue(value);
  };

  transitionAnimation = index => {
    const ranges = [
      (index - 2) * SCREEN_WIDTH,
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
      (index + 2) * SCREEN_WIDTH,
    ];
    return {
      opacity: this.xOffset.interpolate({
        inputRange: ranges,
        outputRange: [0.25, 0.5, 1, 0.5, 0.25],
      }),
      transform: [
        {
          rotate: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: ['30deg', '17deg', '0deg', '-17deg', '-30deg'],
          }),
        },
        {
          translateY: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: [60, 15, 0, 15, 60],
          }),
        },
      ],
    };
  };

  textAnimation = index => {
    const ranges = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    return {
      transform: [
        {
          scale: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: [1, 1.25, 1],
          }),
        },
      ],
    };
  };

  xOffset = new Animated.Value(0);

  render() {
    const { theme, onChange, step, unitType, unitHelpers } = this.props;
    const { min, max } = this.encodeValues();
    const selectionRange = range(min, max + 1, step);
    const selectionTextStyle = styles.selectionText;
    const unitHelper = unitHelpers[unitType];

    return (
      <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.xOffset } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={event => {
            Haptic.selection();
            const selectionNumber = Math.round(
              event.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            onChange(this.decodeValue(Number(selectionRange[selectionNumber])));
          }}
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH}
          ref={ref => {
            if (ref) {
              this.scrollViewRef = ref._component;
            }
          }}
        >
          {selectionRange.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.scrollPage,
                index === 0 ? styles.firstPage : null,
                index === selectionRange.length - 1 ? styles.lastPage : null,
              ]}
              key={item}
              onPress={() => this.onSelectionTap(index)}
              activeOpacity={1}
            >
              <Animated.View
                style={[styles.screen, this.transitionAnimation(index)]}
              >
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
    );
  }
}

export default withSettings(withTheme(ScrollSelect));
