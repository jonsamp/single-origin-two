import React from 'react'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import withSettings from '../../../../providers/settings'

interface AddIceProps {
  unitHelpers: any
  volume: number
}

function AddIce({ unitHelpers, volume }: AddIceProps) {
  const { waterVolumeUnit } = unitHelpers

  return (
    <Card>
      <Instructions
        text={`Add **${waterVolumeUnit.getPreferredValue(volume)} ${
          waterVolumeUnit.unit.title
        }** of ice to your carafe or mug.`}
        icon="IceIcon"
      />
    </Card>
  )
}

export default withSettings(AddIce)