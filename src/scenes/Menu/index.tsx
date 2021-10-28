import * as Notifications from 'expo-notifications'
import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { sortBy } from 'lodash'
import { interpolateColor } from 'react-native-reanimated'

import { StackParams } from '../../navigation'
import MenuItem from '../../components/MenuItem'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withSettings from '../../providers/settings'
import withTheme, { Theme } from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { Settings } from '../../state/settings/types'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import Onboarding from './Onboarding'
import BackgroundImage from './images/background.png'

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

    interpolateColor(1, [0, 1], ['red', 'blue'])
  }

  handleNotification = (event) => {
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

  sortByName = (recipes) => {
    return sortBy(
      recipes,
      (recipe) => `${recipe.title} ${recipe.modifier || ''}`
    )
  }

  render() {
    const { theme, navigation, settings, tracking } = this.props

    const selectedRecipes = Object.keys(settings.recipes).filter(
      (v) => settings.recipes[v] && recipes[v]
    )
    const menuRecipes = Object.values(selectedRecipes).map((sr) => recipes[sr])

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.pageBackground,
        }}
      >
        <ImageBackground
          source={BackgroundImage}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.35 }}
        >
          <ResponsiveScrollView
            contentContainerStyle={{ padding: 12, paddingTop: 24 }}
          >
            {settings.onboardingVisible && <Onboarding />}
            {this.sortByName(menuRecipes).map((recipe) => (
              <MenuItem
                recipe={recipe}
                key={recipe.id}
                onPress={() => {
                  navigation.navigate('Brew', {
                    id: recipe.id,
                    title: `${recipe.title}${
                      recipe.modifier ? ` ${recipe.modifier}` : ''
                    }`,
                  })
                  tracking.track(tracking.events.RECIPE_TAPPED, {
                    id: recipe.id,
                  })
                }}
              />
            ))}
            {menuRecipes.length === 0 && (
              <ScreenPlaceholder text="To start brewing, tap the settings icon, then Recipes, then select which brew methods you'd like to appear here." />
            )}
          </ResponsiveScrollView>
        </ImageBackground>
      </View>
    )
  }
}

export default withTracking(withSettings(withTheme(Menu)))
