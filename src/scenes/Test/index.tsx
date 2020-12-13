import React from 'react'
import { View, Text } from 'react-native'
import withSettings from '../../providers/settings'
import Slider from './Slider'

function TestScene(props: any) {
  const { unitHelpers } = props
  const { temperatureUnit } = unitHelpers

  const min = 160
  const max = 220
  const defaultValue = 205

  return (
    <View>
      <Slider
        label={`${temperatureUnit.unit.title}`}
        unitType="temperatureUnit"
        min={
          unitHelpers['temperatureUnit']
            ? Math.round(unitHelpers['temperatureUnit'].getPreferredValue(min))
            : min
        }
        max={
          unitHelpers['temperatureUnit']
            ? Math.round(unitHelpers['temperatureUnit'].getPreferredValue(max))
            : max
        }
        defaultValue={
          unitHelpers['temperatureUnit']
            ? Math.round(
                unitHelpers['temperatureUnit'].getPreferredValue(defaultValue)
              )
            : defaultValue
        }
        onChange={(value) =>
          console.log(
            'VALUE: ',
            unitHelpers['temperatureUnit'].getStandardValue(value)
          )
        }
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
