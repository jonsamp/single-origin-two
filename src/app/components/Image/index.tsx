import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import withTheme from '../../providers/theme'
import styles from './styles'

interface CustomImageProps {
  theme: any
  source: number
  defaultSource: number
  isPlaying?: boolean
}

class CustomImage extends PureComponent<CustomImageProps> {
  render() {
    const { source, defaultSource, theme } = this.props

    return (
      <Image
        source={source}
        defaultSource={defaultSource}
        style={[
          styles.image,
          {
            backgroundColor: theme.grey3,
          },
        ]}
      />
    )
  }
}

export default withTheme(CustomImage)
