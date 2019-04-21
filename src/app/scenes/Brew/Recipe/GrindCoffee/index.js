import React from 'react'
import PropTypes from 'prop-types'
import withSettings from '@app/providers/settings'
import { Image } from 'react-native'
import { height } from '@app/constants/layout'
import { getValueUnit } from '@app/scenes/Brew/helpers'
import Card from '@app/components/Card'
import Instructions from '@app/components/Instructions'

const propTypes = {
  unitHelpers: PropTypes.object,
  coffeeWeight: PropTypes.number,
  defaultGrind: PropTypes.number,
  title: PropTypes.string,
}

function GrindCoffee({ unitHelpers, coffeeWeight, defaultGrind, title }) {
  const { coffeeWeightUnit, grindUnit } = unitHelpers
  return (
    <Card>
      {grindUnit.grinder.shortTitle === 'grinder' ? (
        <Image
          source={grindUnit.getGrindSetting(0.75).image}
          style={{
            resizeMode: 'cover',
            width: null,
            height: height / 5,
          }}
        />
      ) : null}
      <Instructions
        text={`Grind **${getValueUnit(
          coffeeWeightUnit,
          coffeeWeight
        )}** of coffee to **${
          grindUnit.getGrindSetting(defaultGrind).title
        }** with your ${
          grindUnit.grinder.shortTitle
        }, then add the grounds to your ${title.toLowerCase()}.`}
        icon="GrindIcon"
      />
    </Card>
  )
}

GrindCoffee.propTypes = propTypes

export default withSettings(GrindCoffee)
