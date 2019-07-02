import React from 'react'
import { Image, Text } from 'react-native'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import { height } from '../../../../constants/layout'
import withSettings from '../../../../providers/settings'
import { getValueUnit } from '../../../../scenes/Brew/helpers'
import { Log } from '../../../../state/logs/types'

interface GrindCoffeeProps {
  unitHelpers: any
  coffeeWeight: number
  defaultGrind: number
  title: string
  recentLog: Log
}

function GrindCoffee({
  unitHelpers,
  coffeeWeight,
  defaultGrind,
  title,
  recentLog,
}: GrindCoffeeProps) {
  const { coffeeWeightUnit, grindUnit } = unitHelpers
  let recommendation

  console.log({ recentLog })

  if (recentLog.tastingNote === 'bitter') {
    recommendation =
      'Last time you brewed it was bitter. Try grinding your coffee coarser.'
  } else if (recentLog.tastingNote === 'sour') {
    recommendation =
      'Last time you brewed it was sour. Try grinding your coffee finer.'
  }

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
        hint={recommendation}
      />
    </Card>
  )
}

export default withSettings(GrindCoffee)
