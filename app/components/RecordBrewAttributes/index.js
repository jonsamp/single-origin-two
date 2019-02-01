import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
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
    temp: PropTypes.number,
    setRecipeState: PropTypes.func,
  };

  state = {
    recordSegmentIndex: 0,
  };

  onStartMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 0,
      duration: 150,
    }).start();
  };

  onStopMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 1,
      duration: 150,
    }).start();
  };

  animatedOpacityValue = new Animated.Value(1);

  render() {
    const { settings, theme } = this.props;
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
        unitType="grind"
        min={0}
        max={40}
        defaultValue={this.props.grind}
        label="grind"
        onChange={value => this.props.setRecipeState({ key: 'grind', value })}
        step={1}
      />
    );

    const recordTempComponent = (
      <ScrollSelect
        unitType="temperatureUnit"
        min={160}
        max={210}
        defaultValue={this.props.temp}
        label="Temp"
        onChange={value => this.props.setRecipeState({ key: 'temp', value })}
        step={1}
      />
    );

    return (
      <Card showConnector>
        <Instructions text={instructions} />
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
      </Card>
    );
  }
}

export default withTheme(withSettings(RecordBrewAttributes));
