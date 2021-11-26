import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVerboseSetting, grinders } from '../constants/grinders';
import { units } from '../constants/units';
import { settingUpdated } from '../state/settings/actions';
import { selectSettings } from '../state/settings/selectors';
import { Settings as SettingsType } from '../state/settings/types';
import { State } from '../state/types';

export type Settings = SettingsType;

interface WrapperProps {
  settings: SettingsType;
  settingUpdated: (props: { setting: string; value: any }) => void;
  [i: string]: any;
}

const mapStateToProps = (state: State) => ({ settings: selectSettings(state) });

const mapDispatchToProps = {
  settingUpdated,
};

function withSettings(WrappedComponent) {
  class Wrapper extends Component<WrapperProps> {
    conversions = {
      grams: {
        preferredConversion: (value: number) => Math.round(value),
        standardConversion: (value: number) => Math.round(value),
      },
      fahrenheit: {
        preferredConversion: (value: number) => Math.round(value),
        standardConversion: (value: number) => Math.round(value),
      },
      celsius: {
        preferredConversion: (value: number) => Math.round((value - 32) / 1.8),
        standardConversion: (value: number) => Math.round(value * 1.8 + 32),
      },
      ounces: {
        preferredConversion: (value: number) => (value * 0.035274).toFixed(1),
        standardConversion: (value: number) => Math.round(value / 0.035274),
      },
      cups: {
        preferredConversion: (value: number) => (value * 0.01).toFixed(2),
        standardConversion: (value: number) => Math.round(value / 0.01),
      },
    };

    getUnitHelper = (unit: string) => ({
      getPreferredValue: this.getPreferredValue(unit),
      getStandardValue: this.getStandardValue(unit),
      unit: units[this.props.settings[unit]],
    });

    getGrindHelper = () => ({
      getPreferredValue: (v: number) => v,
      getPreferredValueBasedOnPercent: (percent: number) => {
        const grinder = grinders[this.props.settings.grinderType];
        const range = grinder.max - grinder.min;
        return Math.round(range * percent);
      },
      getStandardValue: (v: number) => v,
      getGrindSetting: (percent: number) => {
        const { grinderType } = this.props.settings;

        if (grinderType === 'generic') {
          return getVerboseSetting(percent);
        }

        const grinder = grinders[grinderType];
        const range = grinder.max - grinder.min;
        return {
          title: `#${Math.round(range * percent)}`,
        };
      },
      grinder: grinders[this.props.settings.grinderType],
      unit: { symbol: 'grind' },
    });

    getPreferredValue = (unit: string) => (value: number) =>
      this.conversions[this.props.settings[unit]].preferredConversion(value);

    getStandardValue = (unit: string) => (value: number) =>
      this.conversions[this.props.settings[unit]].standardConversion(value);

    render() {
      const { settings, settingUpdated, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          settings={settings}
          settingUpdated={settingUpdated}
          unitHelpers={{
            brewedVolumeUnit: this.getUnitHelper('brewedVolumeUnit'),
            coffeeWeightUnit: this.getUnitHelper('coffeeWeightUnit'),
            waterVolumeUnit: this.getUnitHelper('waterVolumeUnit'),
            temperatureUnit: this.getUnitHelper('temperatureUnit'),
            grindUnit: this.getGrindHelper(),
          }}
        />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default withSettings;
