import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { Icon } from './types';

export default function LogsIcon(props: Icon) {
  const { focused, theme } = props;

  return (
    <Svg width={26} height={26} viewBox="0 0 28 27">
      <G fill={focused ? theme?.brand?.default : theme?.icon?.default} fillRule="nonzero">
        <Path d="M10.568 8.21a1 1 0 1 1 0-2h7.245a1 1 0 0 1 0 2h-7.245zM6.437 18.23a1 1 0 0 1 0-2h15.017a1 1 0 1 1 0 2H6.437zM6.594 14.397a1 1 0 1 1 0-2H21.48a1 1 0 1 1 0 2H6.594z" />
        <Path d="M4.537 2.316a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h19a2 2 0 0 0 2-2v-18a2 2 0 0 0-2-2h-19zm0-2h19a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4h-19a4 4 0 0 1-4-4v-18a4 4 0 0 1 4-4z" />
      </G>
    </Svg>
  );
}
