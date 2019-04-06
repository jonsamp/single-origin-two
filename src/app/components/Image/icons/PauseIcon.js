import React from 'react';
import { Svg } from 'expo';

function PauseIcon() {
  return (
    <Svg width="13" height="15">
      <Svg.G transform="translate(.45 .385)" fill="#FFF" fillRule="evenodd">
        <Svg.Rect width="4.707" height="14.363" rx="1" />
        <Svg.Rect x="7.481" width="4.707" height="14.363" rx="1" />
      </Svg.G>
    </Svg>
  );
}

export default PauseIcon;
