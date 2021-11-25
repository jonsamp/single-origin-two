import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from '../../common/theme';
import { Theme } from '../../types/index';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

function Section(props: Props) {
  const { title = '', description, children } = props;
  const tw = useTailwind();

  return (
    <View>
      <View
        style={tw(
          `mt-6 ${description ? '' : 'border-b'} theme.border.default pb-2`
        )}
      >
        <Text style={tw('label theme.text.secondary pl-4')}>
          {title.toUpperCase()}
        </Text>
      </View>
      {description ? (
        <View style={tw('px-4 pb-2 border-b theme.border.default -mt-1')}>
          <Text style={tw('caption theme.text.secondary')}>{description}</Text>
        </View>
      ) : null}
      <View>{children}</View>
    </View>
  );
}

export default Section;
