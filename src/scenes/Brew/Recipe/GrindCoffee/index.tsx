import React from 'react'
import { Image, View } from 'react-native'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import { height, width } from '../../../../constants/layout'
import withSettings from '../../../../providers/settings'
import withTheme, { Styleguide } from '../../../../providers/theme'
import { getValueUnit } from '../../../../scenes/Brew/helpers'
import { Log } from '../../../../state/logs/types'

interface GrindCoffeeProps {
  unitHelpers: any
  coffeeWeight: number
  defaultGrind: number
  title: string
  recentLog: Log
  styleguide: Styleguide
}

function GrindCoffee({
  unitHelpers,
  coffeeWeight,
  defaultGrind,
  title,
  recentLog,
  styleguide,
}: GrindCoffeeProps) {
  const { coffeeWeightUnit, grindUnit } = unitHelpers
  const isMaxWidth = width > styleguide.maxWidth
  let recommendation
  let grindFromLastTime = ''

  if (recentLog.grind) {
    grindFromLastTime = ` you brewed with a grind setting of ${
      recentLog.grind
    } and`
  }

  if (recentLog.tastingNote === 'bitter') {
    recommendation = `Last time${grindFromLastTime} your coffee was bitter. Try grinding your coffee coarser this time.`
  } else if (recentLog.tastingNote === 'sour') {
    recommendation = `Last time${grindFromLastTime} your coffee was sour. Try grinding your coffee finer this time.`
  }

  return (
    <Card>
      <View style={isMaxWidth && { flexDirection: 'row-reverse' }}>
        {grindUnit.grinder.shortTitle === 'grinder' ? (
          <Image
            source={grindUnit.getGrindSetting(0.75).image}
            style={{
              resizeMode: 'cover',
              width: null,
              height: height / 5,
              zIndex: 1,
              flex: 0.5,
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
      </View>
    </Card>
  )
}

export default withSettings(withTheme(GrindCoffee))