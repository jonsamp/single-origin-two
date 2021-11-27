import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function V6001Icon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 36} height={size * 24} viewBox="0 0 36 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.65576 1.5H31.915L21.1708 22.0698H11.7916L1.65576 1.5Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.3612 17.4261C16.3612 17.4261 16.0033 9.1891 22.4148 6.78762"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M19.0972 17.3185C19.0972 17.3185 18.7347 12.4835 21.3953 10.6665"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M7.2793 22.1441H19.1176H26.3541"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M29.3054 6.7876C29.3054 6.7876 32.4501 6.7876 34.6494 6.7876C34.6558 9.3917 31.2995 11.4029 25.1968 14.4918"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default V6001Icon;
