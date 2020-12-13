import React from 'react'
import Card from '../../../../components/Card'
import Question from '../../../../components/Question'
import ScrollSelect from '../../../../components/ScrollSelect'
import withSettings from '../../../../providers/settings'
import { getValueUnit } from '../../../../scenes/Brew/helpers'
import { UnitHelpers } from '../../../../types/index'
import Slider from '../../../../scenes/Test/Slider'

interface YieldQuestionProps {
  unitHelpers: UnitHelpers
  defaultValue: number
  setRecipeState: (props: { key: string; value: any }) => void
  minYield: number
  maxYield: number
}

function YieldQuestion({
  unitHelpers,
  defaultValue,
  setRecipeState,
  minYield,
  maxYield,
}: YieldQuestionProps) {
  const { brewedVolumeUnit } = unitHelpers
  return (
    <Card>
      <Question
        title={`How many ${brewedVolumeUnit.unit.title} would you like your brew to yield?`}
        description={`One serving is typically ${getValueUnit(
          brewedVolumeUnit,
          270
        )}.`}
      />
      <Slider
        key={brewedVolumeUnit.unit.id}
        label={`${brewedVolumeUnit.unit.title}`}
        unitType="brewedVolumeUnit"
        min={
          unitHelpers['brewedVolumeUnit']
            ? Math.round(
                unitHelpers['brewedVolumeUnit'].getPreferredValue(minYield)
              )
            : minYield
        }
        max={
          unitHelpers['brewedVolumeUnit']
            ? Math.round(
                unitHelpers['brewedVolumeUnit'].getPreferredValue(maxYield)
              )
            : maxYield
        }
        defaultValue={
          unitHelpers['brewedVolumeUnit']
            ? Math.round(
                unitHelpers['brewedVolumeUnit'].getPreferredValue(defaultValue)
              )
            : defaultValue
        }
        onChange={(value) =>
          setRecipeState({
            key: 'totalVolume',
            value: unitHelpers['brewedVolumeUnit'].getStandardValue(value),
          })
        }
      />
      {/* <ScrollSelect
        unitType="brewedVolumeUnit"
        min={minYield}
        max={maxYield}
        defaultValue={defaultValue}
        onChange={value =>
          setRecipeState({
            key: 'totalVolume',
            value,
          })
        }
        step={1}
      /> */}
    </Card>
  )
}

export default withSettings(YieldQuestion)
