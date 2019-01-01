import React from 'react';
import { Svg } from 'expo';

function OneIcon({ fill }) {
  return (
    <Svg width="21" height="20">
      <Svg.Path
        d="M10 20c5.523 0 11.367-1.408 10-10-1.367-8.592-4.477-10-10-10S0 2.23 0 10s4.477 10 10 10z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default OneIcon;
