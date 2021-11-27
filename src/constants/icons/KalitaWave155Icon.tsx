import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { Icon } from './types';

function KalitaWave155Icon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={35 * size} height={24 * size} viewBox="0 0 35 24">
      <G fill={fill} fillRule="nonzero">
        <Path d="M2.59 2.5l9.151 18.57h8.151l9.7-18.57H2.591zM.984.5h30.26a1 1 0 0 1 .886 1.463l-10.744 20.57a1 1 0 0 1-.887.537H11.12a1 1 0 0 1-.897-.558L.086 1.942A1 1 0 0 1 .983.5z" />
        <Path d="M13.395 18.604a1 1 0 1 1 0-2h4.958a1 1 0 0 1 0 2h-4.958zM11.428 15.631a1 1 0 1 1 0-2h9.017a1 1 0 1 1 0 2h-9.017zM6.59 23.082a1 1 0 0 1 0-2h19.075a1 1 0 1 1 0 2H6.591zM28.633 7.788a1 1 0 1 1 0-2h5.344a1 1 0 0 1 1 .997c.007 2.922-2.416 4.76-10.001 8.599a1 1 0 1 1-.903-1.784c5.461-2.765 7.922-4.37 8.656-5.812h-4.096z" />
      </G>
    </Svg>
  );
}

export default KalitaWave155Icon;
