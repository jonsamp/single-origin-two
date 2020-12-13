import React from 'react'
import { View, Text } from 'react-native'
import { Slider } from './Slider'

export default function TestScene() {
  return (
    <View>
      <Slider
        min={0}
        max={100}
        defaultValue={10}
        label="grams"
        onChange={(value) => console.log('VALUE: ', value)}
      />
    </View>
  )
}

{
  /* <ScrollSelect
        unitType="grindUnit"
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={
          this.props.grind ||
          grindUnit.getPreferredValueBasedOnPercent(this.props.defaultGrind)
        }
        label="grind"
        onChange={(value) =>
          this.props.setRecipeState({
            key: 'grind',
            value,
          })
        }
        step={1}
      /> */
}
