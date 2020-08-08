import React from 'react'
import { ScrollView, View } from 'react-native'
import { Theme } from '../../types'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import Recipe from './Recipe'
import recipes from './recipes'

interface BrewProps {
  theme: Theme
  isDarkTheme: boolean
  route: any
  navigation: any
}

function Brew(props: BrewProps) {
  const { theme, isDarkTheme, route, navigation } = props
  const { id } = route.params
  const recipe = recipes[id]

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? theme.background : theme.grey1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 12,
          alignItems: 'center',
          paddingTop: 32,
        }}
      >
        <View style={{ width: '100%' }}>
          <Recipe recipe={recipe} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  )
}

export default withSettings(withTheme(Brew))
