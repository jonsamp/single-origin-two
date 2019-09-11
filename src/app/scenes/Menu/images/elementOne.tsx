import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { width } from '../../../constants/layout'

function IceIcon({ fill, ...rest }: { fill: string }) {
  const size = width
  return (
    <Svg width={size} height={size} viewBox="0 0 289 270">
      <Path
        d="M288.5 131C288.5 178.236 252.745 185.529 217 211C194.026 227.371 177.859 270 147.5 270C107.855 270 96.0449 237.411 70.5 211C46.0468 185.718 0 168.951 0 131C0 97.4562 50.8847 78.158 70.5 54C96.2604 22.2738 103.448 0 147.5 0C182.924 0 192.287 32.367 217 54C246.42 79.7533 288.5 88.8284 288.5 131Z"
        fill={fill}
      />
    </Svg>
  )
}

export default IceIcon
