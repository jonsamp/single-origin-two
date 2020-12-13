import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../providers/theme'

export function PlusIcon() {
  const { colors } = useTheme()

  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 1v10M1 6h10"
        stroke={colors.foreground}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}
