import type from '@app/constants/type'
import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import React, { Component } from 'react'
import { LayoutAnimation, Text, TextStyle, View } from 'react-native'

interface WarningProps {
  theme: Theme
  defaultTheme: Theme
  text: string
  isVisible: boolean
}

class Warning extends Component<WarningProps> {
  componentDidUpdate() {
    const config = LayoutAnimation.create(
      350,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    )

    LayoutAnimation.configureNext(config)
  }

  render() {
    const { text, theme, defaultTheme, isVisible } = this.props

    return (
      <View
        style={{
          backgroundColor: theme.warning,
        }}
      >
        {isVisible && (
          <Text
            style={
              {
                ...type.body,
                color: defaultTheme.black,
                padding: 20,
              } as TextStyle
            }
          >
            {text}
          </Text>
        )}
      </View>
    )
  }
}

export default withTheme(Warning)
