import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function RecordIcon({ fill }: Icon) {
  const size = 1.15;
  return (
    <Svg width={21 * size} height={16 * size} viewBox="0 0 21 16">
      <G fill={fill} fillRule="nonzero">
        <Path d="M10.724.636a1 1 0 0 0-.977-.017L6.785 2.212 1.291.543A1 1 0 0 0 .028 1.735l3.249 13.412a1 1 0 0 0 .971.765h12.928a1 1 0 0 0 .986-.834l2.265-13.411A1 1 0 0 0 19.162.54l-5.735 1.67L10.724.635zm-4.122 3.61a1 1 0 0 0 .764-.076l2.835-1.524 2.59 1.507a1 1 0 0 0 .783.096l4.616-1.343-1.86 11.006H5.036L2.384 2.965l4.218 1.281z" />
        <Path d="M5.934 3.93l1.274 6.055a1 1 0 1 0 1.957-.412L7.89 3.518a1 1 0 0 0-1.957.412zM12.58 3.577l-1.1 6.06a1 1 0 0 0 1.969.357l1.099-6.06a1 1 0 1 0-1.968-.357z" />
      </G>
    </Svg>
  );
}

export default RecordIcon;
