import React from 'react'
import { Image } from 'react-native'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import { height } from '../../../../constants/layout'
import withSettings from '../../../../providers/settings'
import { getValueUnit } from '../../../../scenes/Brew/helpers'

interface GrindCoffeeProps {
  unitHelpers: any
  coffeeWeight: number
  defaultGrind: number
  title: string
}

function GrindCoffee({
  unitHelpers,
  coffeeWeight,
  defaultGrind,
  title,
}: GrindCoffeeProps) {
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
            zIndex: 1,
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

export default withSettings(GrindCoffee)
