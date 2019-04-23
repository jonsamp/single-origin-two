import type from '@app/constants/type'
import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import React, { Component, ReactNode } from 'react'
import { Text, TextStyle, View } from 'react-native'
import styles from './styles'

interface SectionProps {
  title: string
  description: string
  theme: Theme
  children: ReactNode
}

class Section extends Component<SectionProps> {
  static defaultProps = {
    title: '',
  }

  render() {
    const { title, description, theme, children } = this.props

    return (
      <View>
        <View
          style={{
            marginTop: 24,
            borderBottomWidth: description ? 0 : 1,
            borderBottomColor: theme.grey2,
            paddingBottom: 8,
          }}
        >
          <Text
            style={
              [
                type.label,
                {
                  color: theme.foreground,
                  opacity: 0.9,
                  paddingLeft: 16,
                },
              ] as TextStyle
            }
          >
            {title.toUpperCase()}
          </Text>
        </View>
        {description ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              paddingTop: 0,
              marginTop: -4,
              borderBottomWidth: 1,
              borderBottomColor: theme.grey2,
            }}
          >
            <Text
              style={[
                styles.description,
                { color: theme.foreground, opacity: 0.9 },
              ]}
            >
              {description}
            </Text>
          </View>
        ) : null}
        <View style={{ backgroundColor: theme.background }}>{children}</View>
      </View>
    )
  }
}

export default withTheme(Section)
