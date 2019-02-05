import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { Haptic } from 'expo';
import { Feather } from '@expo/vector-icons';
import withSettings from 'providers/settings';
import withTheme from 'providers/theme';
import Card from 'components/Card';
import Instructions from 'components/Instructions';
import ScrollSelect from 'components/ScrollSelect';
import DraggableSegment from 'components/DraggableSegment';

class RecordBrewAttributes extends Component {
  static propTypes = {
    theme: PropTypes.object,
    settings: PropTypes.object,
    grind: PropTypes.number,
    defaultGrind: PropTypes.number,
    temp: PropTypes.number,
    setRecipeState: PropTypes.func,
    temperatureUnit: PropTypes.object,
    grindUnit: PropTypes.object,
  };

  state = {
    recordSegmentIndex: 0,
    isOpen: false,
  };

  onStartMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  onStopMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  toggleIsOpen = () => {
    const config = LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    );

    LayoutAnimation.configureNext(config);

    Haptic.selection();

    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () =>
        Animated.spring(this.animatedRotationValue, {
          toValue: this.state.isOpen ? 1 : 0,
          duration: 250,
          useNativeDriver: true,
        }).start()
    );
  };

  animatedOpacityValue = new Animated.Value(1);
  animatedRotationValue = new Animated.Value(0);

  render() {
    const { settings, theme, temperatureUnit, grindUnit } = this.props;
    const { recordSegmentIndex } = this.state;

    if (!settings.recordGrind && !settings.recordTemp) {
      return null;
    }

    const recordSettings = [];
    let instructions;
    if (settings.recordGrind) {
      recordSettings.push('grind');
      instructions = 'Record your grind setting.';
    }
    if (settings.recordTemp) {
      recordSettings.push('temperature');
      instructions = 'Record your water temperature.';
    }

    if (settings.recordTemp && settings.recordGrind) {
      instructions = 'Record your grind setting and water temperature.';
    }

    const recordGrindComponent = (
      <ScrollSelect
        unitType="grindUnit"
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={
          this.props.grind ||
          grindUnit.getPreferredValueBasedOnPercent(this.props.defaultGrind)
        }
        label="grind"
        onChange={value =>
          this.props.setRecipeState({
            key: 'grind',
            value,
          })
        }
        step={1}
      />
    );

    const recordTempComponent = (
      <ScrollSelect
        unitType="temperatureUnit"
        min={temperatureUnit.getPreferredValue(160)}
        max={temperatureUnit.getPreferredValue(210)}
        defaultValue={temperatureUnit.getPreferredValue(this.props.temp)}
        label={temperatureUnit.unit.symbol}
        onChange={value =>
          this.props.setRecipeState({
            key: 'temp',
            value: temperatureUnit.getStandardValue(value),
          })
        }
        step={1}
      />
    );

    return (
      <Card showConnector>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Instructions text={instructions} icon="RecordIcon" />
          <TouchableOpacity
            onPress={this.toggleIsOpen}
            style={{
              padding: 8,
              backgroundColor: theme.foreground,
              borderRadius: 2,
              marginRight: 20,
            }}
            activeOpacity={1}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: this.animatedRotationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-180deg'],
                    }),
                  },
                ],
              }}
            >
              <Feather
                name="chevron-down"
                size={theme.iconSize}
                color={theme.background}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {this.state.isOpen ? (
          <View>
            {recordSettings.length > 1 && (
              <View style={{ backgroundColor: theme.grey2 }}>
                <DraggableSegment
                  options={recordSettings}
                  onChange={index =>
                    setTimeout(() => {
                      this.setState({ recordSegmentIndex: index });
                    }, 300)
                  }
                  onStartMove={this.onStartMove}
                  onStopMove={this.onStopMove}
                />
                <Animated.View
                  style={{
                    opacity: this.animatedOpacityValue,
                  }}
                >
                  {recordSegmentIndex === 0 ? recordGrindComponent : null}
                  {recordSegmentIndex === 1 ? recordTempComponent : null}
                </Animated.View>
              </View>
            )}
            {recordSettings.length === 1
              ? recordSettings.includes('grind')
                ? recordGrindComponent
                : recordTempComponent
              : null}
          </View>
        ) : null}
      </Card>
    );
  }
}

export default withTheme(withSettings(RecordBrewAttributes));
