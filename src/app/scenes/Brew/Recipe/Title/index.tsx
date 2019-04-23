import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import React from 'react'
import { Text, View } from 'react-native'
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
