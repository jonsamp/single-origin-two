import React from 'react'
import PropTypes from 'prop-types'
import withSettings from '@app/providers/settings'
import Card from '@app/components/Card'
import Instructions from '@app/components/Instructions'

const propTypes = {
  unitHelpers: PropTypes.object,
  totalVolume: PropTypes.number,
}

function BoilWater({ unitHelpers, totalVolume }) {
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

BoilWater.propTypes = propTypes

export default withSettings(BoilWater)