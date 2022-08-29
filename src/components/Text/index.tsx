import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { typography } from '../../common/typography';

type Props = TextProps & {
  type?: keyof typeof typography;
  theme?: 'default' | 'secondary';
};

export function Text(props: Props) {
  const { type, style, theme = 'default', ...rest } = props;
  const tw = useTailwind();

  return (
    <RNText
      style={[
        tw(
          `${
            theme === 'secondary'
              ? 'text-secondary dark:text-secondary-dark'
              : 'text-default dark:text-default-dark'
          }`
        ),
        typography[type as keyof typeof typography] ?? typography['body'],
        (style as TextStyle) ?? null,
      ]}
      {...rest}
    />
  );
}
