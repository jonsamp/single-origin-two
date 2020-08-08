import React from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import GrindIcon from './icons/GrindIcon'
import PrepIcon from './icons/PrepIcon'
import RecordIcon from './icons/RecordIcon'
import TipIcon from './icons/TipIcon'
import WaterIcon from './icons/WaterIcon'
import IceIcon from './icons/IceIcon'

interface Instructions {
  theme: any
  text: string
  isDarkTheme?: boolean
  icon?: string
  style?: ViewStyle
  textStyle?: TextStyle
  hint: string
}

function Instructions({
  text,
  theme,
  isDarkTheme,
  icon,
  style,
  textStyle,
  hint,
}: Instructions) {
  const specialWordCaptureGroup = /(\*\*.*?\*\*)/g
  const specialWordRegex = /\*\*.*\*\*/
  const specialWordStyles = {
    ...type.body,
    fontSize: 19,
    color: theme.primaryDark,
    fontWeight: 'bold',
  }
  const formattedText = text.split(specialWordCaptureGroup).map(part => (
    <Text
      key={part}
      style={
        part.match(specialWordRegex) ? (specialWordStyles as TextStyle) : null
      }
    >
      {part.replace(/\*/g, '')}
    </Text>
  ))
  const icons = {
    WaterIcon,
    RecordIcon,
    GrindIcon,
    TipIcon,
    PrepIcon,
    IceIcon,
  }
  const IconComponent = icons[icon]

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {icon ? (
        <View
          style={{
            paddingTop: 18,
            backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
            alignItems: 'center',
            width: 44,
          }}
        >
          <IconComponent
            fill={isDarkTheme ? theme.foreground : theme.background}
          />
        </View>
      ) : null}
      <View style={{ padding: 20, flex: 1, ...style }}>
        <Text
          style={{
            ...type.body,
            color: theme.foreground,
            ...textStyle,
          }}
        >
          {formattedText}
        </Text>
        {hint ? (
          <View
            style={{
              backgroundColor: theme.warning,
              padding: 12,
              borderRadius: 4,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                ...type.body,
                color: theme.foreground,
                ...textStyle,
              }}
            >
              {hint}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default withTheme(Instructions)
