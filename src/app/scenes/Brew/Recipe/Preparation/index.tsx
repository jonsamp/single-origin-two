import Card from '@app/components/Card'
import Instructions from '@app/components/Instructions'
import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

interface PreparationProps {
  theme: Theme
  navigation: any
  recipe: string
}

function Preparation({ theme, navigation, recipe }: PreparationProps) {
  return (
    <TouchableOpacity onPress={() => console.log(recipe)} activeOpacity={0.7}>
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
