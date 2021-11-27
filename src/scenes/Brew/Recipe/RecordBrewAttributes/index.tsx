import { shadows } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import SegmentedControl from '@react-native-community/segmented-control';
import * as Haptics from 'expo-haptics';
import React, { Component } from 'react';
import { Platform, Animated, LayoutAnimation, TouchableOpacity, View } from 'react-native';

import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import Slider from '../../../../components/Slider';
import withSettings from '../../../../providers/settings';
import withTheme from '../../../../providers/theme';
import { Settings } from '../../../../state/settings/types';
import { GrindHelper, Theme, Unit, UnitHelpers } from '../../../../types';

interface RecordBrewAttributesProps {
  theme: Theme;
  settings: Settings;
  grind: number;
  defaultGrind: number;
  temp: number;
  setRecipeState: (props: { key: string; value: any }) => void;
  temperatureUnit: { unit: Unit };
  grindUnit: GrindHelper;
  isDarkTheme: boolean;
  unitHelpers?: UnitHelpers;
}

interface RecordBrewAttributesState {
  recordSegmentIndex: number;
  isOpen: boolean;
  containerHeight: number;
}

class RecordBrewAttributes extends Component<RecordBrewAttributesProps, RecordBrewAttributesState> {
  state = {
    recordSegmentIndex: 0,
    isOpen: false,
    containerHeight: 0,
  };

  animatedRotationValue = new Animated.Value(0);

  toggleIsOpen = async () => {
    const config = LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    );

    LayoutAnimation.configureNext(config);

    if (Platform.OS === 'ios') {
      await Haptics.selectionAsync();
    }

    this.setState(
      (prevState) => ({ isOpen: !prevState.isOpen }),
      () => {
        if (this.state.isOpen) {
          this.props.setRecipeState({ key: 'attributesRecorded', value: true });
        }

        Animated.spring(this.animatedRotationValue, {
          toValue: this.state.isOpen ? 1 : 0,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  recordGrindComponent = () => {
    const { grindUnit } = this.props;

    return (
      <Slider
        label={grindUnit.grinder.shortTitle}
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={
          this.props.grind || grindUnit.getPreferredValueBasedOnPercent(this.props.defaultGrind)
        }
        onChange={(value) => {
          this.props.setRecipeState({
            key: 'grind',
            value: grindUnit.getPreferredValue(value),
          });
        }}
      />
    );
  };

  recordTempComponent = () => {
    const { unitHelpers, temperatureUnit } = this.props;
    const min = unitHelpers['temperatureUnit']
      ? Math.round(unitHelpers['temperatureUnit'].getPreferredValue(160))
      : 160;
    const max = unitHelpers['temperatureUnit']
      ? Math.round(unitHelpers['temperatureUnit'].getPreferredValue(220))
      : 220;
    const defaultValue = unitHelpers['temperatureUnit']
      ? Math.round(unitHelpers['temperatureUnit'].getPreferredValue(this.props.temp))
      : this.props.temp;

    return (
      <Slider
        key={temperatureUnit.unit.id}
        min={min}
        max={max}
        label={temperatureUnit.unit.title}
        defaultValue={defaultValue}
        onChange={(value) => {
          this.props.setRecipeState({
            key: 'temp',
            value: unitHelpers['temperatureUnit'].getStandardValue(value),
          });
        }}
      />
    );
  };

  render() {
    const { settings, theme, isDarkTheme } = this.props;
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

    return (
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            {instructions && (
              <Instructions text={instructions} icon="RecordIcon" textStyle={{ flex: 1 }} />
            )}
          </View>
          <TouchableOpacity
            onPress={this.toggleIsOpen}
            style={[
              {
                padding: 4,
                backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
                borderRadius: 8,
                marginRight: 20,
              },
              shadows.tiny,
            ]}
            activeOpacity={1}>
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
              }}>
              <Feather name="chevron-down" size={theme.iconSize} color={theme.foreground} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {this.state.isOpen ? (
          <View
            style={{
              backgroundColor: theme.grey2,
              minHeight: this.state.containerHeight,
            }}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              this.setState({ containerHeight: height });
            }}>
            {recordSettings.length > 1 && (
              <View
                style={{
                  paddingHorizontal: 16,
                  marginTop: 16,
                }}>
                <SegmentedControl
                  backgroundColor={
                    isDarkTheme
                      ? Platform.select({ android: '#212121' })
                      : Platform.select({ android: '#dddddd' })
                  }
                  appearance={isDarkTheme ? 'dark' : 'light'}
                  values={recordSettings.map(
                    (name) => name.charAt(0).toUpperCase() + name.slice(1)
                  )}
                  selectedIndex={recordSegmentIndex}
                  onChange={(event) => {
                    this.setState({
                      recordSegmentIndex: event.nativeEvent.selectedSegmentIndex,
                    });
                  }}
                />
                <View>
                  {recordSegmentIndex === 0 ? this.recordGrindComponent() : null}
                  {recordSegmentIndex === 1 ? this.recordTempComponent() : null}
                </View>
              </View>
            )}
            {recordSettings.length === 1
              ? recordSettings.includes('grind')
                ? this.recordGrindComponent()
                : this.recordTempComponent()
              : null}
          </View>
        ) : null}
      </Card>
    );
  }
}

export default withTheme(withSettings(RecordBrewAttributes));
