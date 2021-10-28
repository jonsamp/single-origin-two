import React from 'react'
import { View } from 'react-native'
import withSettings from '../../providers/settings'
import Slider from '../../components/Slider'
import recipes from '../../constants/recipes'

function TestScene(props: any) {
  return (
    <View style={{ padding: 16 }}>
      <Slider />
    </View>
  )
}

export default withSettings(TestScene)
