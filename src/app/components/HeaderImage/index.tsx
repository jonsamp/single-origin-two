import { height, width } from '@app/constants/layout'
import withTheme from '@app/providers/theme'
import { LinearGradient } from 'expo'
import React from 'react'
import { Image, View } from 'react-native'

interface HeaderImage {
  source: number
  theme: any
}

function HeaderImage({ source, theme }: HeaderImage) {
  const imageHeight = height / 4
  const gradientHeight = height / 4
  return (
    <View style={{ marginBottom: -72 }}>
      <Image
        source={source}
        style={{
          width: width + 12,
          height: imageHeight,
          resizeMode: 'cover',
          left: -12,
          top: -12,
        }}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', theme.background]}
        style={{
          position: 'absolute',
          width: width + 12,
          left: -12,
          height: gradientHeight,
          top: imageHeight - gradientHeight - 12,
        }}
      />
    </View>
  )
}

export default withTheme(HeaderImage)
