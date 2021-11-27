import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

type Props = {
  fill: string;
};

function GrindIcon(props: Props) {
  const { fill } = props;

  return (
    <Svg width="23" height="24">
      <G fill={fill} fillRule="evenodd">
        <Path d="M12.106 10.62L8.104.92l11.144 1.618zM14.124 23.408l-4.493-9.425 11.144 1.046zM8.104 10.511l-6.91 5.139L.022 6.978zM8.104 16.493l-.668 5.801-5.06-3.616zM6.404 5.36L1.85 4.24 5.28.886zM22.574 11.314l-5.968-.134 3.25-5.096z" />
      </G>
    </Svg>
  );
}

export default GrindIcon;
