import React from 'react';
import { Switch, View } from 'react-native';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import withSettings from '../../../../providers/settings';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function AddIce(props: Props) {
  const { onChange, value } = props;

  return (
    <Card>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 20 }}
      >
        <Instructions text='Make this brew iced' />
        <Switch value={value} onValueChange={onChange} />
      </View>
    </Card>
  );
}

export default withSettings(AddIce);
