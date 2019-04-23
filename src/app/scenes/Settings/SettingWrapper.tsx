import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import React, { ReactNode } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

interface SettingWrapperProps {
  children: ReactNode
  theme: Theme
  title: string
  description: string
  borderTop: boolean
  isDarkTheme: boolean
}

const SettingWrapper = ({
  children,
  theme,
  title,
  description,
  borderTop,
  isDarkTheme,
}: SettingWrapperProps) => (
  <View
    style={{ backgroundColor: isDarkTheme ? theme.background : theme.grey1 }}
  >
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDarkTheme ? theme.background : theme.grey2,
        backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
        borderTopWidth: borderTop ? 1 : 0,
        borderTopColor: theme.grey2,
      }}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.title,
            { color: theme.foreground, textTransform: 'capitalize' },
          ]}
        >
          {title}
        </Text>
        {children}
      </View>
    </View>
    {description ? (
      <View
        style={{
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
    ) : null}
  </View>
)

export default withTheme(SettingWrapper)
