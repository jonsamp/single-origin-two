import withTheme from '@app/providers/theme'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import PauseIcon from './icons/PauseIcon'
import PlayIcon from './icons/PlayIcon'
import styles from './styles'

interface CustomImageProps {
  theme: any
  source: number
  defaultSource: number
  isPlaying: boolean
}

interface CustomImageState {
  isPlaying: boolean
}

class CustomImage extends PureComponent<CustomImageProps, CustomImageState> {
  static getDerivedStateFromProps(props, state) {
    if (props.isPlaying && !state.isPlaying) {
      return {
        isPlaying: true,
      }
    }

    return null
  }

  state = {
    isPlaying: false,
  }

  toggle = () =>
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))

  render() {
    const { source, defaultSource, theme } = this.props
    const { isPlaying } = this.state

    return (
      <TouchableOpacity onPress={this.toggle} activeOpacity={1}>
        <Image
          source={isPlaying ? source : defaultSource}
          defaultSource={defaultSource}
          style={[
            styles.image,
            {
              backgroundColor: theme.grey3,
            },
          ]}
        />
        <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
          {defaultSource ? isPlaying ? <PauseIcon /> : <PlayIcon /> : null}
        </View>
      </TouchableOpacity>
    )
  }
}

export default withTheme(CustomImage)
