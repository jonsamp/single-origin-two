import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { shadows } from '@expo/styleguide-native'
import { useTheme } from '../../common/theme'
import { typography } from '../../common/typography'

type Props = {
  type?: 'normal' | 'secondary' | 'tertiary' | 'outline'
  onPress?: () => void
  title: string
  customStyle?: object
  customTextStyle?: object
  disabled?: boolean
  loading?: boolean
}

export default function Button(props: Props) {
  const {
    type,
    onPress,
    title,
    disabled,
    customStyle,
    customTextStyle,
    loading,
  } = props
  const { theme, dark } = useTheme()

  let buttonStyle = [styles.button, { backgroundColor: theme.brand.default }]
  let textStyle = [
    styles.text,
    {
      color: dark ? theme.background.default : theme.button.primary.foreground,
    },
    customTextStyle,
  ]

  if (type === 'secondary') {
    buttonStyle = [
      styles.button,
      { backgroundColor: theme.button.secondary.background },
    ]
    textStyle = [styles.text, { color: theme.button.secondary.foreground }]
  }

  if (type === 'tertiary') {
    buttonStyle = [
      styles.button,
      { backgroundColor: theme.button.tertiary.background },
    ]
    textStyle = [styles.text, { color: theme.button.tertiary.foreground }]
  }

  if (type === 'outline') {
    buttonStyle = [
      styles.buttonOutline,
      {
        backgroundColor: theme.button.ghost.background,
        borderColor: theme.button.ghost.border,
      },
    ]
    textStyle = [styles.text, { color: theme.button.ghost.foreground }]
  }

  if (disabled) {
    return (
      <TouchableOpacity
        style={[buttonStyle, styles.disabled, customStyle]}
        onPress={() => {}}
        activeOpacity={0.5}
      >
        <Text style={[textStyle, customTextStyle]}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[buttonStyle, customStyle]}
        onPress={onPress}
        activeOpacity={loading ? 1 : 0.6}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.background.default} />
        ) : (
          <Text style={[textStyle, customTextStyle]}>
            {title.toUpperCase()}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const defaultButton = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
  paddingHorizontal: 28,
  overflow: 'hidden',
  borderRadius: 6,
} as ViewStyle

const styles = StyleSheet.create({
  text: {
    ...typography.callout,
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
  buttonContainer: shadows.button,
  button: defaultButton,
  disabled: {
    opacity: 0.5,
  },
  textOutline: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
  buttonOutline: {
    ...defaultButton,
    paddingVertical: 12,
    paddingHorizontal: 26,
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
})
