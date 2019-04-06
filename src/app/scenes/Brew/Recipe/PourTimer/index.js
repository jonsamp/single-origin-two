import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import { KeepAwake } from 'expo';
import AnimateNumber from 'react-native-animate-number';
import formatSeconds from '@app/helpers/formatSeconds';
import withTheme from '@app/providers/theme';
import withSettings from '@app/providers/settings';
import Button from '@app/components/Button';
import Card from '@app/components/Card';
import Instructions from '@app/components/Instructions';
import Image from '@app/components/Image';
import Tip from '../Tip';
import Warning from '../Warning';
import styles from './styles';

class PourTimer extends Component {
  static propTypes = {
    theme: PropTypes.object,
    seconds: PropTypes.number,
    onTick: PropTypes.func,
    waterPercent: PropTypes.number,
    totalWaterWeight: PropTypes.number,
    unitHelpers: PropTypes.object,
    tip: PropTypes.object,
    warningText: PropTypes.string,
    source: PropTypes.number,
    defaultSource: PropTypes.number,
    totalVolume: PropTypes.number,
    totalTime: PropTypes.number,
  };

  static defaultProps = {
    seconds: 0,
    waterPercent: 0,
    totalWaterWeight: 0,
    onTick: () => {},
    unitHelpers: {},
  };

  state = {
    seconds: this.props.seconds,
    timerRunning: false,
  };

  componentDidMount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(nextProps) {
    if (
      nextProps.waterPercent !== this.props.waterPercent &&
      this.state.timerRunning
    ) {
      this.onAnimateNumberBegin();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onAnimateNumberBegin = () =>
    Animated.sequence([
      {
        start: onComplete => {
          // Haptic.selection();
          onComplete({ finished: true });
        },
      },
      Animated.timing(this.trackingAnimatedValue, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();

  onAnimateNumberFinish = () =>
    Animated.sequence([
      {
        start: onComplete => {
          // Haptic.selection();
          onComplete({ finished: true });
        },
      },
      Animated.timing(this.trackingAnimatedValue, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();

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

  countdown = () => {
    this.setState(
      prevState => ({
        seconds: prevState.seconds + 1,
      }),
      () => this.props.onTick(this.state.seconds)
    );
  };

  trackingAnimatedValue = new Animated.Value(0);

  renderTimePart = part => (
    <Text style={[styles.timeText, { color: this.props.theme.foreground }]}>
      {part}
    </Text>
  );

  renderTimer = () => {
    const parts = formatSeconds(this.state.seconds).split('');

    return (
      <View style={{ flexDirection: 'row' }}>
        {parts.map((part, index) => (
          <View
            key={index}
            style={
              part === ':'
                ? styles.timeTextColonContainer
                : styles.timeTextContainer
            }
          >
            {this.renderTimePart(part)}
          </View>
        ))}
      </View>
    );
  };

  render() {
    const {
      theme,
      totalWaterWeight,
      waterPercent,
      unitHelpers,
      tip,
      warningText,
      source,
      defaultSource,
      totalVolume,
      totalTime,
    } = this.props;
    const { waterVolumeUnit } = unitHelpers;
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
      <Card>
        <Image
          source={source}
          defaultSource={defaultSource}
          isPlaying={this.state.timerRunning}
        />
        <Instructions
          text={`Pour a total of **${Math.round(
            waterVolumeUnit.getPreferredValue(totalVolume)
          )} ${
            waterVolumeUnit.unit.title
          }** of water over the next **${formatSeconds(
            totalTime
          )}** with the pour timer.`}
        />
        <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
          <View style={styles.section}>
            {this.renderTimer()}
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
                    value={waterVolumeUnit.getPreferredValue(
                      totalWaterWeight * waterPercent
                    )}
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
                        ? 4
                        : waterVolumeUnit.unit.symbol === 'oz'
                          ? 0.1
                          : 0.01
                    }
                    interval={waterVolumeUnit.unit.symbol === 'g' ? 30 : 60}
                    onFinish={this.onAnimateNumberFinish}
                  />
                </Animated.Text>
              </View>
              <Animated.Text
                style={[
                  styles.trackingLabelText,
                  { color: trackingAnimatedText },
                ]}
              >
                {waterVolumeUnit.unit.title}
              </Animated.Text>
            </Animated.View>
          </View>
        </View>
        <Tip text={tip.text} isVisible={!!tip.text} />
        <Warning text={warningText} isVisible={!!warningText} />
      </Card>
    );
  }
}

export default withSettings(withTheme(PourTimer));
