import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import SettingWrapper from './SettingWrapper';

const propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

const SwitchSetting = ({ title, description, value, onChange }) => (
  <SettingWrapper title={title} description={description}>
    <Switch value={value} onChange={v => onChange(v.nativeEvent.value)} />
  </SettingWrapper>
);

SwitchSetting.propTypes = propTypes;

export default SwitchSetting;
