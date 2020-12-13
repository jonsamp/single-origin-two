import React from 'react'
import { View, Text } from 'react-native'
import withSettings from '../../providers/settings'
import Slider from './Slider'

function TestScene(props: any) {
  const { unitHelpers } = props
  const { temperatureUnit } = unitHelpers
  return (
    <View>
      <Slider
        unitType="temperatureUnit"
        min={160}
        max={220}
        defaultValue={205}
        label={temperatureUnit.unit.title}
        onChange={(value) => console.log('VALUE: ', value)}
      />
    </View>
  )
}

export default withSettings(TestScene)

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
