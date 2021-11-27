import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { Icon } from './types';

function BeehouseIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 36} height={size * 24} viewBox="0 0 36 24" fill="none">
      <Path
        clipRule="evenodd"
        d="M1.877 4.265h27.096l-9.621 18.42h-8.399L1.877 4.264z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.704 22.686H24.78M27.229 7.618s2.912-5.894 6.806-5.894"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default BeehouseIcon;
