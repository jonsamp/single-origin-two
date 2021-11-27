import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useTailwind } from '../../common/theme';

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
        <Text style={tw('label theme.text.secondary pl-4')}>{title.toUpperCase()}</Text>
      </View>
      <View style={tw('rounded-lg overflow-hidden theme.background.overlay')}>{children}</View>
      {description ? (
        <View style={tw('px-4 pb-2 pt-2')}>
          <Text style={tw('caption theme.text.secondary')}>{description}</Text>
        </View>
      ) : null}
    </>
  );
}

export default Section;
