import React, { PureComponent } from 'react'
import { Image, ImageStyle } from 'react-native'
import withTheme from '../../providers/theme'
import styles from './styles'

interface CustomImageProps {
  theme: any
  source: number
  defaultSource: number
  style: ImageStyle
  isPlaying?: boolean
}

class CustomImage extends PureComponent<CustomImageProps> {
  render() {
    const { source, defaultSource, theme, style } = this.props

    return (
      <Image
        source={source}
        defaultSource={defaultSource}
        style={[
          styles.image,
          {
            backgroundColor: theme.grey3,
          },
          style,
        ]}
      />
    )
  }
}

export default withTheme(CustomImage)
