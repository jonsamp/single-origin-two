import React from 'react'
import { Switch } from 'react-native'
import SettingWrapper from './SettingWrapper'

interface SwitchSettingProps {
  value: boolean
  onChange: (props: any) => void
  title: string
  description?: string
  borderTop?: boolean
}

const SwitchSetting = ({
  title,
  description,
  value,
  onChange,
  borderTop,
}: SwitchSettingProps) => (
  <SettingWrapper title={title} description={description} borderTop={borderTop}>
    <Switch value={value} onValueChange={v => onChange(v)} />
  </SettingWrapper>
)

export default SwitchSetting
