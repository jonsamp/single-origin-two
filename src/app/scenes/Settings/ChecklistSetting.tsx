import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'
import SettingWrapper from './SettingWrapper'

interface ChecklistSettingProps {
  theme: Theme
  onChange: (id: string) => void
  items: Item[]
  style: ViewStyle
}

interface Item {
  title: string
  id: string
  value: boolean
  modifier: string
}

const ChecklistSetting = ({
  theme,
  onChange,
  items,
  style,
}: ChecklistSettingProps) =>
  items.map(item => (
    <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
      <SettingWrapper
        title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}
        style={style}
      >
        {item.value ? (
          <Feather name="check" size={theme.iconSize} color={theme.primary} />
        ) : null}
      </SettingWrapper>
    </TouchableOpacity>
  ))

export default withTheme(ChecklistSetting)
