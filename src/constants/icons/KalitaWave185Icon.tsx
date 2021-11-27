import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function KalitaWave185Icon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={36 * size} height={23 * size} viewBox="0 0 36 23">
      <G fill={fill} fillRule="nonzero">
        <Path d="M3.263 2l9.15 18.57h8.152L30.265 2H3.262zM1.656 0h30.259a1 1 0 0 1 .886 1.463l-10.744 20.57a1 1 0 0 1-.886.537h-9.38a1 1 0 0 1-.897-.558L.76 1.442A1 1 0 0 1 1.656 0z" />
        <Path d="M14.067 18.104a1 1 0 1 1 0-2h4.959a1 1 0 0 1 0 2h-4.96zM12.1 15.131a1 1 0 1 1 0-2h9.017a1 1 0 1 1 0 2h-9.016zM10.137 12.131a1 1 0 1 1 0-2h13.042a1 1 0 1 1 0 2H10.137zM7.203 22.603a1 1 0 0 1 0-2h19.075a1 1 0 1 1 0 2H7.203zM29.305 7.288a1 1 0 1 1 0-2h5.344a1 1 0 0 1 1 .997c.007 2.922-2.415 4.76-10 8.599a1 1 0 1 1-.904-1.784c5.461-2.765 7.922-4.37 8.656-5.812h-4.096z" />
      </G>
    </Svg>
  );
}

export default KalitaWave185Icon;
