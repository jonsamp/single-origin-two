import React from 'react';
import { Switch } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Card from '../../../../components/Card';
import { Text } from '../../../../components/Text';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function AddIce(props: Props) {
  const { onChange, value } = props;
  const tw = useTailwind();

  return (
    <Card style={tw('p-4 flex-row items-center justify-between')}>
      <Text>Make this brew iced</Text>
      <Switch value={value} onValueChange={onChange} />
    </Card>
  );
}

export default AddIce;
