import React from 'react';
import { Svg } from 'expo';

function ThreeIcon({ fill }) {
  return (
    <Svg width="22" height="21">
      <Svg.Path
        d="M10.95 20.808c4.948-1.33 10.21-5.011 10.21-10 0-4.99-5.787-11.26-10.21-10-4.422 1.26-10 4.477-10 10 0 5.522 5.053 11.33 10 10z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default ThreeIcon;
