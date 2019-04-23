import type from '@app/constants/type'
import withTheme from '@app/providers/theme'
import React from 'react'
import { Text, TextStyle, View } from 'react-native'
import GrindIcon from './icons/GrindIcon'
import RecordIcon from './icons/RecordIcon'
import TipIcon from './icons/TipIcon'
import WaterIcon from './icons/WaterIcon'

interface Instructions {
  theme: any
  text: string
  isDarkTheme?: boolean
  icon?: string
}

function Instructions({ text, theme, isDarkTheme, icon }: Instructions) {
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
            paddingTop: 20,
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
      <View style={{ padding: 20, flex: 1 }}>
        <Text
          style={
            {
              ...type.body,
              color: theme.foreground,
            } as TextStyle
          }
        >
          {formattedText}
        </Text>
      </View>
    </View>
  )
}

export default withTheme(Instructions)
