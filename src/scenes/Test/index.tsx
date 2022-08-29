import React from 'react';
import { View } from 'react-native';

import Slider from '../../components/Slider';

function TestScene() {
  return (
    <View style={{ padding: 16 }}>
      <Slider min={1} max={10} defaultValue={5} />
    </View>
  );
}

export default TestScene;
