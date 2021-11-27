import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function TipIcon({ fill }: Icon) {
  return (
    <Svg width="17" height="21">
      <G fill={fill} fillRule="nonzero">
        <Path d="M14.912 8.337c0-3.323-2.008-5.993-6.139-5.993-4.215 0-6.114 2.464-6.114 5.993 0 1.585 1.149 3.868 3.493 6.768h5.12c2.437-3.104 3.64-5.405 3.64-6.768zM8.773.344c5.38 0 8.14 3.669 8.14 7.993 0 2.014-1.471 4.762-4.377 8.393a1 1 0 0 1-.78.375H5.678a1 1 0 0 1-.77-.362c-2.816-3.4-4.25-6.171-4.25-8.406C.659 3.8 3.323.344 8.773.344zM7.092 20.181a1 1 0 0 1 0-2h3.387a1 1 0 1 1 0 2H7.092z" />
      </G>
    </Svg>
  );
}

export default TipIcon;
