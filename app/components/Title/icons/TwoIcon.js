import React from 'react';
import { Svg } from 'expo';

function TwoIcon({ fill }) {
  return (
    <Svg width="21" height="22">
      <Svg.Path
        d="M10.819 21c6.244-1.215 10-4.477 10-10s-4.415-8.695-10-10c-5.585-1.305-10 4.477-10 10s3.756 11.215 10 10z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default TwoIcon;
