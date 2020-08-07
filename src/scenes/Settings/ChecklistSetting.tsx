import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import withTheme from '../../providers/theme'
import { MenuItem, Theme } from '../../types'
import SettingWrapper from './SettingWrapper'

interface ChecklistSettingProps {
  theme: Theme
  onChange: (id: string) => void
  items: EnhancedMenuItem[]
  style: ViewStyle
}

interface EnhancedMenuItem extends MenuItem {
  value: boolean
}

const ChecklistSetting = ({
  theme,
  onChange,
  items,
  style,
}: ChecklistSettingProps) =>
  items.map((item, index) => (
    <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
      <SettingWrapper
        title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}
        style={{
          ...style,
          ...(index === items.length - 1 ? { borderBottomWidth: 0 } : null),
        }}
      >
        {item.value ? (
          <Feather
            name="check"
            size={theme.iconSize - 3}
            color={theme.primary}
          />
        ) : null}
      </SettingWrapper>
    </TouchableOpacity>
  ))

export default withTheme(ChecklistSetting)
