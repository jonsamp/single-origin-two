import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Haptic } from 'expo';
import withTheme from 'providers/theme';
import Button from 'components/Button';
import styles from './styles';

class PourTimer extends Component {
  static propTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { theme } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: theme.grey2 }]}>
        <View style={styles.section}>
          <Text style={[styles.timeText, { color: theme.foreground }]}>
            4:00
          </Text>
          <Button title="start" />
        </View>
        <View style={styles.section}>
          <Text style={[styles.labelText, { color: theme.foreground }]}>
            POUR UP TO
          </Text>
          <View
            style={[
              styles.trackingContainer,
              { backgroundColor: theme.grey1, borderColor: theme.grey3 },
            ]}
          >
            <Text style={[styles.trackingText, { color: theme.foreground }]}>
              -- grams
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(PourTimer);
