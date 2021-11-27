import React from 'react';
import { Svg, G, Rect } from 'react-native-svg';

function PauseIcon() {
  return (
    <Svg width="13" height="15">
      <G transform="translate(.45 .385)" fill="#FFF" fillRule="evenodd">
        <Rect width="4.707" height="14.363" rx="1" />
        <Rect x="7.481" width="4.707" height="14.363" rx="1" />
      </G>
    </Svg>
  );
}

export default PauseIcon;
