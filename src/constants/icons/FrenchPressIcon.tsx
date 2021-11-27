import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function AeropressIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 29} height={size * 40} viewBox="0 0 29 40" fill="none">
      <Path d="M5.65088 38.1235H25.8857" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M6.76953 38.1236V13.5236H27.7864C27.7864 13.5236 24.8581 16.0122 24.8581 17.7248C24.8581 19.4375 24.8581 38.1236 24.8581 38.1236"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.76962 17.6124C1.4248 17.6124 1.4248 17.6233 1.4248 24.2803C1.4248 30.9374 1.4248 30.9374 6.76962 30.9374"
        stroke={fill}
        strokeWidth="2"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.4426 10.9015C24.4426 6.60346 20.559 3.1192 15.7684 3.1192C10.9778 3.1192 7.09424 6.60346 7.09424 10.9015C9.95021 10.9015 21.764 10.9015 24.4426 10.9015Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.768 3.48107C16.6171 3.48107 17.3055 2.7927 17.3055 1.94357C17.3055 1.09443 16.6171 0.406067 15.768 0.406067C14.9188 0.406067 14.2305 1.09443 14.2305 1.94357C14.2305 2.7927 14.9188 3.48107 15.768 3.48107Z"
        fill={fill}
      />
      <Path d="M9.81369 26.5499H21.8137" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <Path d="M15.9664 10.9015V26.3255" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export default AeropressIcon;
