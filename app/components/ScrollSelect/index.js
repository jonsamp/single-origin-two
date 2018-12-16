import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, Animated } from 'react-native';
import withTheme from 'providers/theme';
import { width } from 'constants/layout';
import styles from './styles';

const xOffset = new Animated.Value(0);
const SCREEN_WIDTH = width / 3;

class ScrollSelect extends Component {
  static propTypes = {
    theme: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
  };

  xOffset = new Animated.Value(0);

  transitionAnimation = index => ({
    transform: [
      {
        rotate: this.xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['10deg', '0deg', '-10deg'],
        }),
      },
      {
        translateY: this.xOffset.interpolate({
          inputRange: [
            (index - 2) * SCREEN_WIDTH,
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
            (index + 2) * SCREEN_WIDTH,
          ],
          outputRange: [65, 20, 0, 20, 65],
        }),
      },
    ],
  });

  render() {
    const { theme, min, max, onChange } = this.props;
    return (
      <View style={{ backgroundColor: theme.grey3 }}>
        <Button
          onPress={() => {
            this._scrollView &&
              this._scrollView.scrollTo({ x: 100, y: 0, animated: true });
          }}
          title="scroll"
        />
        <Animated.ScrollView
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.xOffset } } }],
            { useNativeDriver: true }
          )}
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.0}
          snapToInterval={SCREEN_WIDTH}
          ref={ref => {
            if (ref) {
              this._scrollView = ref._component;
            }
          }}
        >
          {[0, 1, 2, 3, 4, 5].map(item => (
            <View
              style={[
                styles.scrollPage,
                item === 0 ? styles.firstPage : null,
                item === 5 ? styles.lastPage : null,
              ]}
              key={item}
            >
              <Animated.View
                style={[styles.screen, this.transitionAnimation(item)]}
              >
                <View style={styles.selection}>
                  <Text style={[styles.selectionText]}>{item}</Text>
                </View>
              </Animated.View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default withTheme(ScrollSelect);
