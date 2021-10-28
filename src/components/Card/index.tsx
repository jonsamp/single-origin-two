import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import { shadows } from '@expo/styleguide-native'
import { useTailwind } from '../../common/theme'

type Props = {
  children: ReactNode
  style?: ViewStyle
  containerStyle?: ViewStyle
}

function Card(props: Props) {
  const { children, style, containerStyle } = props
  const tw = useTailwind()

  return (
    <View style={[shadows.small, tw('rounded-lg mb-8'), containerStyle]}>
      <View
        style={[
          tw('theme.background.overlay rounded-lg overflow-hidden'),
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

export default Card
