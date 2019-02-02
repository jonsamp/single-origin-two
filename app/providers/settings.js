import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { settingUpdated } from 'state/settings/actions';
import { selectSettings } from 'state/settings/selectors';
import { units } from 'constants/units';
import { grinders, getVerboseSetting } from 'constants/grinders';

const mapStateToProps = state => ({ settings: selectSettings(state) });

const mapDispatchToProps = {
  settingUpdated,
};

function withSettings(WrappedComponent) {
  class Wrapper extends Component {
    static propTypes = {
      settings: PropTypes.object,
      settingUpdated: PropTypes.func,
    };

    getUnitHelper = unit => ({
      getPreferredValue: this.getPreferredValue(unit),
      getStandardValue: this.getStandardValue(unit),
      unit: units[this.props.settings[unit]],
    });

    getGrindHelper = () => ({
      getPreferredValue: v => v,
      getStandardValue: v => v,
      getGrindSetting: percent => {
        const { grinderType } = this.props.settings;

        if (grinderType === 'generic') {
          return getVerboseSetting(percent);
        }

        const grinder = grinders[grinderType];
        const range = grinder.max - grinder.min;
        return `#${Math.round(range * percent) + grinder.min}`;
      },
      grinder: grinders[this.props.settings.grinderType],
      unit: { symbol: 'grind' },
    });

    getPreferredValue = unit => value =>
      this.conversions[this.props.settings[unit]].preferredConversion(value);

    getStandardValue = unit => value =>
      this.conversions[this.props.settings[unit]].standardConversion(value);

    conversions = {
      grams: {
        preferredConversion: value => Math.round(value),
        standardConversion: value => Math.round(value),
      },
      fahrenheit: {
        preferredConversion: value => Math.round(value),
        standardConversion: value => Math.round(value),
      },
      celsius: {
        preferredConversion: value => Math.round((value - 32) / 1.8),
        standardConversion: value => Math.round((value + 32) * 1.8),
      },
      ounces: {
        preferredConversion: value => (value * 0.035274).toFixed(1),
        standardConversion: value => Math.round(value / 0.035274),
      },
      cups: {
        preferredConversion: value => (value * 0.01).toFixed(2),
        standardConversion: value => Math.round(value / 0.01),
      },
    };

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

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper);
}

export default withSettings;
