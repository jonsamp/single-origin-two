import Card from '@app/components/Card'
import Instructions from '@app/components/Instructions'
import withSettings from '@app/providers/settings'
import React from 'react'

interface BoilWaterProps {
  unitHelpers: any
  totalVolume: number
}

function BoilWater({ unitHelpers, totalVolume }: BoilWaterProps) {
  const { waterVolumeUnit, temperatureUnit } = unitHelpers
  return (
    <Card>
      <Instructions
        text={`Heat **${Math.round(
          waterVolumeUnit.getPreferredValue(totalVolume)
        )} ${
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
