import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import SettingWrapper from './SettingWrapper'

// const propTypes = {
//   theme: PropTypes.object,
//   onChange: PropTypes.func,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       id: PropTypes.string,
//       value: PropTypes.bool,
//     })
//   ),
// }

interface ChecklistSettingProps {
  theme: Theme
  onChange: (id: string) => void
  items: Item[]
}

interface Item {
  title: string
  id: string
  value: boolean
  modifier: string
}

// interface Setting

const ChecklistSetting = ({ theme, onChange, items }: ChecklistSettingProps) =>
  items.map(item => (
    <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
      <SettingWrapper
        title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}
      >
        {item.value ? (
          <Feather name="check" size={theme.iconSize} color={theme.primary} />
        ) : null}
      </SettingWrapper>
    </TouchableOpacity>
  ))

export default withTheme(ChecklistSetting)
