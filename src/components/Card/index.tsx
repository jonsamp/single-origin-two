import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'

interface CardProps {
  theme: Theme
  children: ReactNode
  style: ViewStyle
  containerStyle: ViewStyle
  isDarkTheme: boolean
}

function Card({
  theme,
  children,
  style,
  containerStyle,
  isDarkTheme,
}: CardProps) {
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
        borderRadius: 8,
        marginBottom: 32,
        ...containerStyle,
      }}
    >
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
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
