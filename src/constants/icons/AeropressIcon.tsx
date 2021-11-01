import React from "react";
import { Path, Rect, Svg } from "react-native-svg";
import { Icon } from "./types";

function AeropressIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 23} height={size * 42} viewBox="0 0 23 42" fill="none">
      <Path
        d="M20.9727 40.0181H2.81711"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M17.8614 40.0181L17.8614 8.79749"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M5.88292 39.0362L5.88292 8.87171"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M20.5337 8.79749L3.86144 8.79749"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Rect
        x="20.9058"
        y="35.4072"
        width="18.0887"
        height="33.499"
        transform="rotate(180 20.9058 35.4072)"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.9307 1.91199L1.81945 1.91199"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8613 13.0363C11.0329 13.0363 10.3613 13.7078 10.3613 14.5363C10.3613 15.3647 11.0329 16.0363 11.8613 16.0363C12.6898 16.0363 13.3613 15.3647 13.3613 14.5363C13.3613 13.7078 12.6898 13.0363 11.8613 13.0363Z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8613 18.0363C11.0329 18.0363 10.3613 18.7078 10.3613 19.5363C10.3613 20.3647 11.0329 21.0363 11.8613 21.0363C12.6898 21.0363 13.3613 20.3647 13.3613 19.5363C13.3613 18.7078 12.6898 18.0363 11.8613 18.0363Z"
        fill={fill}
      />
    </Svg>
  );
}

export default AeropressIcon;
