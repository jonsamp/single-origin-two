import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Header from '../../components/Header'
import { Theme } from '../../constants/themes'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
import Recipe from './Recipe'
import recipes from './recipes'

interface BrewProps {
  theme: Theme
  navigation: NavigationScreenProp<State, any>
  isDarkTheme: boolean
}

class Brew extends Component<BrewProps> {
  render() {
    const { theme, navigation, isDarkTheme } = this.props
    const { id } = navigation.state.params
    const recipe = recipes[id]

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
      >
        <Header
          title={recipe.title}
          right={
            <TouchableOpacity
              style={{ paddingRight: 8, top: -2 }}
              onPress={() =>
                navigation.navigate('SettingsDetail', 'Units' as any)
              }
            >
              <Feather
                name="sliders"
                color={theme.foreground}
                size={theme.iconSize}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            alignItems: 'center',
            paddingTop: 32,
          }}
        >
          <View style={{ width: '100%' }}>
            <Recipe recipe={recipe} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(withSettings(withTheme(Brew)) as any)
