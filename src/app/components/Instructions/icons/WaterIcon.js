import React from 'react'
import { Svg } from 'expo'

function WaterIcon({ fill }) {
  return (
    <Svg width="16" height="22">
      <Svg.Path
        d="M14.702 11.132L9.174.872a1.106 1.106 0 0 0-1.946 0L1.7 11.132a7.385 7.385 0 1 0 13.002 0z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default WaterIcon
