import React, { ReactNode } from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { width } from '../../constants/layout'
import withTheme, { Styleguide, Theme } from '../../providers/theme'

interface ResponsiveScrollViewProps {
  styleguide: Styleguide
  children: ReactNode
  style: ViewStyle
  wrapperStyle: ViewStyle
}

function ResponsiveScrollView(props: ResponsiveScrollViewProps) {
  const { styleguide, children, wrapperStyle, style } = props
  const insets = useSafeAreaInsets()
  const isMaxWidth = width >= styleguide.maxWidth

  return (
    <View style={[{ flex: 1 }, wrapperStyle]}>
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: 16,
            paddingTop: 32,
            paddingBottom: insets.bottom,
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
