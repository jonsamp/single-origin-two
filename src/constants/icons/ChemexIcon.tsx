import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { Icon } from './types';

function CleverIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 28} height={size * 42} viewBox="0 0 28 43" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.61 41.6273C20.4911 41.6273 26.2367 40.37 26.2367 34.6843C26.2367 28.9986 18.4269 23.3367 18.4269 17.7526C18.4269 12.1685 25.55 1.74753 25.55 1.74753C25.55 1.74753 19.2674 1 13.382 1C7.4966 1 1.9186 1.74753 1.9186 1.74753C1.9186 1.74753 8.70153 12.1286 8.70153 17.7526C8.70153 23.3766 1.30322 29.0034 1.30322 34.6843C1.30322 40.3652 6.72899 41.6273 13.61 41.6273Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1623 16.8614C20.1623 18.6818 21.5038 22.6373 21.5038 22.6373C21.5038 22.6373 19.073 24 13.9118 24C8.75066 24 6 22.6373 6 22.6373C6 22.6373 7.48867 17.9082 7.48867 16.8614C7.48867 15.8146 6 11.6091 6 11.6091C6 11.6091 7.21874 11 13.9118 11C20.605 11 22 11.6091 22 11.6091C22 11.6091 20.1623 15.0409 20.1623 16.8614Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path d="M21.8009 17.4722H5.94444" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M14.1315 17.5616L12.6074 21.3137"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M13.5871 16.5369L15.4816 20.1162"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default CleverIcon;
