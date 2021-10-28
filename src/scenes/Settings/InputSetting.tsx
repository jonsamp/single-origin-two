import React from 'react'
import { TextInput, ViewStyle } from 'react-native'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'
import SettingWrapper from './SettingWrapper'
import styles from './styles'

interface InputSettingProps {
  value: number
  onChange: (value: any) => void
  title: string
  description: string
  theme: Theme
  borderTop: boolean
}

const InputSetting = ({
  title,
  description,
  value,
  onChange,
  theme,
  borderTop,
}: InputSettingProps) => (
  <SettingWrapper title={title} description={description} borderTop={borderTop}>
    <TextInput
      value={value.toString()}
      style={
        [
          styles.input,
          { borderColor: theme.border, color: theme.foreground },
        ] as ViewStyle
      }
      keyboardType="number-pad"
      maxLength={2}
      onChangeText={(v) => onChange(Number(v))}
      returnKeyType="done"
    />
  </SettingWrapper>
)

export default withTheme(InputSetting)
