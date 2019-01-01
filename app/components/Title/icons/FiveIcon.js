import React from 'react';
import { Svg } from 'expo';

function FiveIcon({ fill }) {
  return (
    <Svg width="21" height="20">
      <Svg.Path
        d="M10.242 19.99c5.523 0 8.79-4.32 10-10 1.211-5.68-4.477-10-10-10-5.522 0-11.53 3.86-10 10 1.532 6.14 4.478 10 10 10z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default FiveIcon;
