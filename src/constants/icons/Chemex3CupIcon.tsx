import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { Icon } from './types';

function Clever3CupIcon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 23} height={size * 42} viewBox="0 0 23 42" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5344 40.6543C22.6977 40.6543 22.6872 40.6282 21.3778 35.5921C20.0684 30.556 17.0502 23.0329 17.0502 17.6531C17.0502 12.2732 20.7668 1.49298 20.7668 1.49298C20.7668 1.49298 18.0126 1.51335 11.2732 1.51335C4.53383 1.51335 2.19387 1.49298 2.19387 1.49298C2.19387 1.49298 5.9136 12.2348 5.9136 17.6531C5.9136 23.0713 2.70412 31.169 1.73743 36.1062C0.770747 41.0435 0.37098 40.6543 11.5344 40.6543Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3832 16.7335C17.3832 18.5093 18.9697 22.2528 18.9697 22.2528C18.9697 22.2528 16.591 23.5821 11.5403 23.5821C6.48961 23.5821 3.79785 22.2528 3.79785 22.2528C3.79785 22.2528 5.25464 17.6397 5.25464 16.6185C5.25464 15.5974 3.79785 11.495 3.79785 11.495C3.79785 11.495 4.9905 10.9009 11.5403 10.9009C18.0901 10.9009 19.1815 11.61 19.1815 11.61C19.1815 11.61 17.3832 14.9577 17.3832 16.7335Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path d="M18.3443 16.9146H4.34429" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M12.1481 17.4557L10.624 21.0705"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M11.6037 16.4684L13.4982 19.9167"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Clever3CupIcon;
