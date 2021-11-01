import React from "react";
import { Path, Svg } from "react-native-svg";
import { Icon } from "./types";

function EvaSoloIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 23} height={size * 44} viewBox="0 0 23 44" fill="none">
      <Path
        clipRule="evenodd"
        d="M11.395 42.51c11.163 0 11.23-.005 9.92-5.041-1.309-5.036-4.327-18.56-4.327-23.94 0-5.379 1.717-9.16 1.717-9.16h-7.571c-6.74 0-7.257-.02-7.257-.02s1.72 3.742 1.72 9.16c0 5.419-3.21 19.516-4.177 24.454C.454 42.9.232 42.51 11.395 42.51z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M11.272 34.824V15.598s-.66-5.34-8.633-5.34c2.241 2.419 2.744 4.535 2.744 4.535M11.272 34.824V15.598s.66-5.34 8.634-5.34c-2.242 2.419-2.744 4.535-2.744 4.535"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.264 22.839a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill={fill}
      />
      <Path
        d="M6.841 4.35L5.158 1H17.37l-1.466 3.35"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default EvaSoloIcon;
