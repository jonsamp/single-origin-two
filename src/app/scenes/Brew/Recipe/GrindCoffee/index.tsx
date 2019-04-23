import Card from '@app/components/Card'
import Instructions from '@app/components/Instructions'
import { height } from '@app/constants/layout'
import withSettings from '@app/providers/settings'
import { getValueUnit } from '@app/scenes/Brew/helpers'
import React from 'react'
import { Image } from 'react-native'

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
