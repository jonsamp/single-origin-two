import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { Icon } from './types'

function V60Icon({ fill, size = 1 }: Icon) {
  return (
    <Svg width={size * 36} height={size * 23} viewBox="0 0 36 23" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.82764 1H32.0868L21.3426 21.5698H11.9635L1.82764 1Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5331 16.9261C16.5331 16.9261 16.1752 8.6891 22.5867 6.28762"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M13.8978 16.9281C13.8978 16.9281 13.3282 10.5853 17.3823 6.29483"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M19.2691 16.8185C19.2691 16.8185 18.9066 11.9835 21.5672 10.1665"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M7.40479 21.5938H19.2431H26.4796"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M29.4773 6.2876C29.4773 6.2876 32.622 6.2876 34.8213 6.2876C34.8276 8.8917 31.4714 10.9029 25.3687 13.9918"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default V60Icon
