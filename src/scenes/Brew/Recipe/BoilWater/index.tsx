import React from 'react'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import withSettings from '../../../../providers/settings'

interface BoilWaterProps {
  unitHelpers: any
  volume: number
}

function BoilWater({ unitHelpers, volume }: BoilWaterProps) {
  const { waterVolumeUnit, temperatureUnit } = unitHelpers

  return (
    <Card>
      <Instructions
        text={`Heat **${waterVolumeUnit.getPreferredValue(volume)} ${
          waterVolumeUnit.unit.title
        }** of water to **${temperatureUnit.getPreferredValue(205)}${
          temperatureUnit.unit.symbol
        }** (nearly boiling).`}
        icon="WaterIcon"
      />
    </Card>
  )
}

export default withSettings(BoilWater)
