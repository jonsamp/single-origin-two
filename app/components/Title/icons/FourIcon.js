import React from 'react';
import { Svg } from 'expo';

function FourIcon({ fill }) {
  return (
    <Svg width="22" height="21">
      <Svg.Path
        d="M10.915 20.165c5.523 0 11.443-4.978 10-10-1.442-5.021-4.477-10-10-10s-8.915 4.478-10 10c-1.085 5.523 4.477 10 10 10z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default FourIcon;
