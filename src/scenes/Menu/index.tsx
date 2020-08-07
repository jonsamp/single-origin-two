import * as Notifications from 'expo-notifications'
import React, { Component } from 'react'
import { ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'

import { StackParams } from '../../navigation'
import ListItem from '../../components/ListItem'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withSettings from '../../providers/settings'
import withTheme, { Theme } from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { Settings } from '../../state/settings/types'
import Onboarding from './Onboarding'

interface MenuProps {
  theme: Theme
  navigation: StackNavigationProp<StackParams, 'Brew'>
  isDarkTheme: boolean
  settings: Settings
  tracking: Tracking
}

class Menu extends Component<MenuProps> {
  componentDidMount() {
    Notifications.addNotificationResponseReceivedListener(
      this.handleNotification
    )
  }

  handleNotification = event => {
    if (
      event &&
      event.notification &&
      event.notification.request &&
      event.notification.request.content &&
      event.notification.request.content.data &&
      event.notification.request.content.data.timestamp
    ) {
      const { navigation } = this.props
      const { timestamp } = event.notification.request.content.data

      //@ts-ignore
      navigation.navigate('LogDetailEdit', { timestamp })
    }
  }

  render() {
    const { theme, navigation, settings, tracking } = this.props

    const selectedRecipes = Object.keys(settings.recipes).filter(
      v => settings.recipes[v] && recipes[v]
    )
    const menuRecipes = Object.values(selectedRecipes).map(sr => recipes[sr])

    return (
      <SafeAreaView
        edges={['top']}
        style={{
          flex: 1,
          backgroundColor: theme.pageBackground,
        }}
      >
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          {settings.onboardingVisible && <Onboarding />}
          {menuRecipes.map(recipe => (
            <ListItem
              recipe={recipe}
              key={recipe.id}
              onPress={() => {
                navigation.navigate('Brew', {
                  id: recipe.id,
                  title: `${recipe.title}${
                    recipe.modifier ? ` ${recipe.modifier}` : ''
                  }`,
                })
                tracking.track(tracking.events.RECIPE_TAPPED, { id: recipe.id })
              }}
            />
          ))}
          {menuRecipes.length === 0 && (
            <ScreenPlaceholder text="To start brewing, tap the settings icon, then Recipes, then select which brew methods you'd like to appear here." />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default withTracking(withSettings(withTheme(Menu)))
