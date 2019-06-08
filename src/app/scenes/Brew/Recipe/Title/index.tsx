import React from 'react'
import { Text, View } from 'react-native'
import withTheme from '../../../../providers/theme'
import { Theme } from '../../../../types/index'
import styles from './styles'

interface TitleProps {
  theme: Theme
  title: string
}

function Title({ title, theme }: TitleProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: theme.primary }]} />
      <Text
        style={[
          styles.title,
          {
            color: theme.foreground,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  )
}

export default withTheme(Title)
