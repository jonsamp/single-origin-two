import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Text } from '../../components/Text';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

function Section(props: Props) {
  const { title = '', description, children } = props;
  const tw = useTailwind();

  return (
    <>
      <View style={tw(`pb-2 ${title ? 'pt-6' : ''}`)}>
        <Text type="label" theme="secondary" style={tw('pl-4')}>
          {title.toUpperCase()}
        </Text>
      </View>
      <View
        style={tw(
          'rounded-lg border border-default dark:border-default-dark overflow-hidden bg-overlay dark:bg-overlay-dark'
        )}>
        {children}
      </View>
      {description ? (
        <View style={tw('px-4 pb-2 pt-2')}>
          <Text type="caption" theme="secondary">
            {description}
          </Text>
        </View>
      ) : null}
    </>
  );
}

export default Section;
