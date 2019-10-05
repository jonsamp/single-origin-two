import React, { ReactNode } from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import { width } from '../../constants/layout'
import withTheme, { Styleguide, Theme } from '../../providers/theme'

interface ResponsiveScrollViewProps {
  styleguide: Styleguide
  children: ReactNode
  style: ViewStyle
  wrapperStyle: ViewStyle
  theme: Theme
}

function ResponsiveScrollView(props: ResponsiveScrollViewProps) {
  const { styleguide, children, wrapperStyle, style, theme } = props
  const isMaxWidth = width >= styleguide.maxWidth

  return (
    <View
      style={[{ flex: 1, backgroundColor: theme.background }, wrapperStyle]}
    >
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: 16,
            paddingTop: 32,
            paddingBottom: 60,
            ...(isMaxWidth && { alignItems: 'center' }),
          },
          style,
        ]}
      >
        <View style={isMaxWidth && { width: styleguide.maxWidth }}>
          {children}
        </View>
      </ScrollView>
    </View>
  )
}

export default withTheme(ResponsiveScrollView)
