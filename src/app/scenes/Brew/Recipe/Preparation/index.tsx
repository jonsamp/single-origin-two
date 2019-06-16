import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import Card from '../../../../components/Card'
import Instructions from '../../../../components/Instructions'
import withTheme from '../../../../providers/theme'
import { Theme } from '../../../../types/index'

interface PreparationProps {
  theme: Theme
  navigation: any
  recipe: string
}

function Preparation({ theme, navigation, recipe }: PreparationProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Preparation', recipe)}
      activeOpacity={0.7}
    >
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
          }}
        >
          <Instructions text={`Prepare your ${recipe}.`} icon="TipIcon" />
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default withTheme(withNavigation(Preparation))
