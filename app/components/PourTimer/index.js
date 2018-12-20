import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import { Haptic } from 'expo';
import AnimateNumber from 'react-native-animate-number';
import withTheme from 'providers/theme';
import Button from 'components/Button';
import styles from './styles';

class PourTimer extends Component {
  static propTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    secondsRemaining: 0,
    timerRunning: false,
    trackingValue: 100,
  };

  componentDidMount() {
    clearInterval(this.interval);
    this.setState({
      secondsRemaining: this.props.seconds,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStart = () => {
    Animated.sequence([
      {
        start: onComplete => {
          Haptic.notification(Haptic.NotificationFeedbackType.Success);
          onComplete({ finished: true });
        },
      },
      Animated.timing(this.trackingAnimatedValue, {
        toValue: 1,
        duration: 200,
      }),
      {
        start: onComplete => {
          if (this.state.trackingValue === 100) {
            this.setState({ trackingValue: 350 });
          } else {
            this.setState({ trackingValue: 100 });
          }
          onComplete({ finished: true });
        },
      },
      Animated.delay(1650),
      {
        start: onComplete => {
          Haptic.notification(Haptic.NotificationFeedbackType.Success);
          onComplete({ finished: true });
        },
      },
      Animated.timing(this.trackingAnimatedValue, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();
  };

  trackingAnimatedValue = new Animated.Value(0);

  render() {
    const { theme } = this.props;

    const trackingAnimatedScale = this.trackingAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25],
    });
    const trackingAnimatedShadow = this.trackingAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const trackingAnimatedBorder = this.trackingAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.grey3, theme.primary],
    });
    const trackingAnimatedBackground = this.trackingAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.background, theme.primary],
    });
    const trackingAnimatedText = this.trackingAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.foreground, theme.background],
    });

    return (
      <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
        <View style={styles.section}>
          <Text style={[styles.timeText, { color: theme.foreground }]}>
            4:00
          </Text>
          <Button title="start" onPress={this.handleStart} />
        </View>
        <View style={styles.section}>
          <Text style={[styles.labelText, { color: theme.foreground }]}>
            POUR UP TO
          </Text>
          <Animated.View
            style={[
              styles.trackingContainer,
              {
                backgroundColor: trackingAnimatedBackground,
                transform: [{ scale: trackingAnimatedScale }],
                borderColor: trackingAnimatedBorder,
                shadowOpacity: trackingAnimatedShadow,
              },
            ]}
          >
            <View style={styles.setWidthText}>
              <Animated.Text
                style={[styles.trackingText, { color: trackingAnimatedText }]}
              >
                <AnimateNumber
                  value={this.state.trackingValue}
                  countBy={5}
                  interval={25}
                />
              </Animated.Text>
            </View>
            <Animated.Text
              style={[
                styles.trackingLabelText,
                { color: trackingAnimatedText },
              ]}
            >
              grams
            </Animated.Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default withTheme(PourTimer);
