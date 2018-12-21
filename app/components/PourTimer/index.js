import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import { Haptic, KeepAwake } from 'expo';
import AnimateNumber from 'react-native-animate-number';
import formatSeconds from 'helpers/formatSeconds';
import withTheme from 'providers/theme';
import Button from 'components/Button';
import styles from './styles';

class PourTimer extends Component {
  static propTypes = {
    theme: PropTypes.object,
    seconds: PropTypes.number,
    onTick: PropTypes.func,
  };

  static defaultProps = {
    seconds: 0,
    onTick: () => {},
  };

  state = {
    seconds: this.props.seconds,
    timerRunning: false,
    trackingValue: 0,
  };

  componentDidMount() {
    clearInterval(this.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown = () => {
    this.setState(
      prevState => ({
        seconds: prevState.seconds + 1,
      }),
      () => this.props.onTick(this.state.seconds)
    );
  };

  toggleCountdown = () => {
    if (this.state.timerRunning) {
      KeepAwake.deactivate();
      clearInterval(this.interval);
      this.setState({ timerRunning: false });
      return;
    }

    KeepAwake.activate();
    this.interval = setInterval(this.countdown, 1000);
    this.setState({ timerRunning: true });
  };

  pourTrackingUpdated = () => {
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
    const { timerRunning } = this.state;
    const inputRange = [0, 1];
    const trackingAnimatedScale = this.trackingAnimatedValue.interpolate({
      inputRange,
      outputRange: [1, 1.25],
    });
    const trackingAnimatedShadow = this.trackingAnimatedValue.interpolate({
      inputRange,
      outputRange: [0, 1],
    });
    const trackingAnimatedBorder = this.trackingAnimatedValue.interpolate({
      inputRange,
      outputRange: [theme.grey3, theme.primary],
    });
    const trackingAnimatedBackground = this.trackingAnimatedValue.interpolate({
      inputRange,
      outputRange: [theme.background, theme.primary],
    });
    const trackingAnimatedText = this.trackingAnimatedValue.interpolate({
      inputRange,
      outputRange: [theme.foreground, theme.background],
    });

    return (
      <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
        <View style={styles.section}>
          <Text style={[styles.timeText, { color: theme.foreground }]}>
            {formatSeconds(this.state.seconds)}
          </Text>
          <Button
            type={timerRunning ? 'secondary' : 'primary'}
            title={timerRunning ? 'stop' : 'start'}
            onPress={this.toggleCountdown}
          />
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
