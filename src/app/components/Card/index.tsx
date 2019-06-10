import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'

interface CardProps {
  theme: Theme
  children: ReactNode
  style: ViewStyle
}

function Card({ theme, children, style }: CardProps) {
  return (
    <View
      style={{
        shadowColor: theme.black,
        shadowRadius: 10,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.2,
        backgroundColor: theme.grey1,
        borderRadius: 8,
        marginBottom: 40,
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: theme.grey1,
          borderRadius: 8,
          minHeight: 16,
          ...style,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default withTheme(Card)
