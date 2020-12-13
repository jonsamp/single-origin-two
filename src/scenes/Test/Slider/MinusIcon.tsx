import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../../providers/theme'

export function MinusIcon() {
  const { colors } = useTheme()

  return (
    <Svg width={13} height={2} viewBox="0 0 13 2" fill="none">
      <Path
        d="M1.5 1h10"
        stroke={colors.foreground}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}
