import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image } from 'react-native'
import withTheme from '@app/providers/theme'
import PauseIcon from './icons/PauseIcon'
import PlayIcon from './icons/PlayIcon'
import styles from './styles'

class CustomImage extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    source: PropTypes.number,
    defaultSource: PropTypes.number,
    isPlaying: PropTypes.bool,
  }

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
