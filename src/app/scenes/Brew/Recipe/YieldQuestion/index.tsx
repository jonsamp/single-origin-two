import React from 'react'
import Card from '../../../../components/Card'
import Question from '../../../../components/Question'
import ScrollSelect from '../../../../components/ScrollSelect'
import withSettings from '../../../../providers/settings'
import { getValueUnit } from '../../../../scenes/Brew/helpers'
import { UnitHelpers } from '../../../../types/index'

interface YieldQuestionProps {
  unitHelpers: UnitHelpers
  totalVolume: number
  setRecipeState: (props: { key: string; value: any }) => void
  minYield: number
  maxYield: number
}

function YieldQuestion({
  unitHelpers,
  totalVolume,
  setRecipeState,
  minYield,
  maxYield,
}: YieldQuestionProps) {
  const { brewedVolumeUnit } = unitHelpers
  return (
    <Card>
      <Question
        title={`How many ${
          brewedVolumeUnit.unit.title
        } would you like your brew to yield?`}
        description={`One serving is typically ${getValueUnit(
          brewedVolumeUnit,
          270
        )}.`}
      />
      <ScrollSelect
        unitType="brewedVolumeUnit"
        min={minYield}
        max={maxYield}
        defaultValue={totalVolume}
        onChange={value =>
          setRecipeState({
            key: 'totalVolume',
            value,
          })
        }
        step={1}
      />
    </Card>
  )
}

export default withSettings(YieldQuestion)