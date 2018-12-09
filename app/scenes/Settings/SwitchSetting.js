import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import SettingWrapper from './SettingWrapper';

const propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  valueName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

const SwitchSetting = ({
  title,
  description,
  value,
  onValueChange,
  valueName,
}) => (
  <SettingWrapper title={title} description={description}>
    <Switch value={value} onValueChange={v => onValueChange(valueName, v)} />
  </SettingWrapper>
);

SwitchSetting.propTypes = propTypes;

export default SwitchSetting;
