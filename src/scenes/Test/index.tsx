import React from 'react';
import { View } from 'react-native';

import Slider from '../../components/Slider';
import { recipes } from '../../constants/recipes';
import withSettings from '../../providers/settings';

function TestScene(props: any) {
  return (
    <View style={{ padding: 16 }}>
      <Slider />
    </View>
  );
}

export default withSettings(TestScene);
