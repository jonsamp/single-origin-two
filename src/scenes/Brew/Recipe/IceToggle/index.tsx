import React from 'react';
import { Switch, Text } from 'react-native';

import { useTailwind } from '../../../../common/theme';
import Card from '../../../../components/Card';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function AddIce(props: Props) {
  const { onChange, value } = props;
  const tw = useTailwind();

  return (
    <Card style={tw('p-4 flex-row items-center justify-between')}>
      <Text style={tw('body theme.text.default')}>Make this brew iced</Text>
      <Switch value={value} onValueChange={onChange} />
    </Card>
  );
}

export default AddIce;
