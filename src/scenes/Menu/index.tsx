import { Notifications } from 'expo'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'

import { StackParams } from '../../navigation'
import ListItem from '../../components/ListItem'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { Settings } from '../../state/settings/types'
import { Theme } from '../../types/index'
import Onboarding from './Onboarding'

interface MenuProps {
  theme: Theme
  navigation: StackNavigationProp<StackParams, 'Brew'>
  isDarkTheme: boolean
  settings: Settings
  tracking: Tracking
}

class Menu extends Component<MenuProps> {
  notificationSubscription

  componentDidMount() {
    const { navigation, tracking } = this.props

    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    )

    navigation.addListener('focus', () => {
      tracking.track(tracking.events.MENU_VIEWED)
    })
  }

  handleNotification = notification => {
    if (notification.data && notification.data.timestamp) {
      // const resetAction = StackActions.reset({
      //   index: 1,
      //   actions: [
      //     NavigationActions.navigate({
      //       routeName: 'StackNavigator',
      //     }),
      //     NavigationActions.navigate({
      //       routeName: 'LogDetailEdit',
      //       params: { timestamp: notification.data.timestamp },
      //     }),
      //   ],
      // })
      // this.props.navigation.dispatch(resetAction)
    }
  }
  render() {
    const { theme, navigation, isDarkTheme, settings, tracking } = this.props
    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    const selectedRecipes = Object.keys(settings.recipes).filter(
      v => settings.recipes[v] && recipes[v]
    )
    const menuRecipes = Object.values(selectedRecipes).map(sr => recipes[sr])

    return (
      <SafeAreaView
        edges={['top']}
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
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