import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-native'
import SettingWrapper from './SettingWrapper'

const propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  borderTop: PropTypes.bool,
}

const SwitchSetting = ({ title, description, value, onChange, borderTop }) => (
  <SettingWrapper title={title} description={description} borderTop={borderTop}>
    <Switch value={value} onChange={v => onChange(v.nativeEvent.value)} />
  </SettingWrapper>
)

SwitchSetting.propTypes = propTypes

export default SwitchSetting
