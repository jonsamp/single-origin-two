import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'

import Slider from '@react-native-community/slider'

function Test() {
  const [sliderKey, setSliderKey] = useState('')
  const [value, setValue] = useState(0)

  return (
    <View style={{ padding: 32 }}>
      <Button
        onPress={() => {
          setValue(value + 1)
          setSliderKey(String(value + 1))
        }}
        title="Add one"
      />
      <Button
        onPress={() => {
          setValue(value - 1)
          setSliderKey(String(value - 1))
        }}
        title="Substract one"
      />
      <Text style={{ fontSize: 24 }}>{value}</Text>
      <Slider
        key={sliderKey}
        value={value}
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#ccc"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => setValue(value)}
      />
    </View>
  )
}

export default Test
