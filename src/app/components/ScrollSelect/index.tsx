import React, { Component } from 'react'
import { View } from 'react-native'
import withTheme from '../../providers/theme'
import ScrollSelect from './ScrollSelect'

class ScrollSelectContainer extends Component<any> {
  state = {
    containerWidth: undefined,
  }

  render() {
    const { containerWidth } = this.state

    return (
      <View
        onLayout={event =>
          this.setState({ containerWidth: event.nativeEvent.layout.width })
        }
      >
        {containerWidth && (
          <ScrollSelect
            containerWidth={this.state.containerWidth}
            {...this.props}
          />
        )}
      </View>
    )
  }
}

export default withTheme(ScrollSelectContainer)
