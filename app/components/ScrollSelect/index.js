import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Haptic } from 'expo';
import withTheme from 'providers/theme';
import { width } from 'constants/layout';
import styles from './styles';

const SCREEN_WIDTH = width / 3;

class ScrollSelect extends Component {
  static propTypes = {
    theme: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
  };

  onSelectionTap = index => {
    const itemPosition = index * SCREEN_WIDTH;

    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({ x: itemPosition, y: 0, animated: true });
    }
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
      transform: [
        {
          rotate: this.xOffset.interpolate({
            inputRange: ranges,
            outputRange: ['30deg', '17deg', '0deg', '-17deg', '-30deg'],
            extrapolate: 'clamp',
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
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

  xOffset = new Animated.Value(0);

  render() {
    const { theme, min, max, onChange } = this.props;
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
            onChange(selectionNumber + 1);
          }}
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.0}
          snapToInterval={SCREEN_WIDTH}
          ref={ref => {
            if (ref) {
              this.scrollViewRef = ref._component;
            }
          }}
        >
          {[0, 1, 2, 3, 4, 5].map(index => (
            <TouchableOpacity
              style={[
                styles.scrollPage,
                index === 0 ? styles.firstPage : null,
                index === 5 ? styles.lastPage : null,
              ]}
              key={index}
              onPress={() => this.onSelectionTap(index)}
              activeOpacity={1}
            >
              <Animated.View
                style={[styles.screen, this.transitionAnimation(index)]}
              >
                <View style={styles.selection}>
                  <Animated.Text
                    style={[
                      styles.selectionText,
                      this.textAnimation(index),
                      { color: theme.foreground },
                    ]}
                  >
                    {index + 1}
                  </Animated.Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        <View style={[styles.label, { backgroundColor: theme.foreground }]}>
          <Text style={[styles.labelText, { color: theme.grey2 }]}>CUPS</Text>
        </View>
      </View>
    );
  }
}

export default withTheme(ScrollSelect);