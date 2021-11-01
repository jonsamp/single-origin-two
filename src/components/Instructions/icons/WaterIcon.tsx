import React from "react";
import { Path, Svg } from "react-native-svg";
import { Icon } from "./types";

function WaterIcon({ fill }: Icon) {
  return (
    <Svg width="16" height="22">
      <Path
        d="M14.702 11.132L9.174.872a1.106 1.106 0 0 0-1.946 0L1.7 11.132a7.385 7.385 0 1 0 13.002 0z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default WaterIcon;
