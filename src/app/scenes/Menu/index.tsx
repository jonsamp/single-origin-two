import { Notifications } from 'expo'
import React, { Component } from 'react'
import HeaderScrollView from 'react-native-header-scroll-view'
import {
  NavigationActions,
  NavigationScreenProp,
  StackActions,
  withNavigation,
} from 'react-navigation'
import ListItem from '../../components/ListItem'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import { Settings } from '../../state/settings/types'
import { Theme } from '../../types/index'

interface MenuProps {
  theme: Theme
  navigation: NavigationScreenProp<any>
  isDarkTheme: boolean
  settings: Settings
}

class Menu extends Component<MenuProps> {
  notificationSubscription

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    )
  }

  handleNotification = notification => {
    if (notification.data && notification.data.timestamp) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'StackNavigator',
          }),
          NavigationActions.navigate({
            routeName: 'LogDetailEdit',
            params: { timestamp: notification.data.timestamp },
          }),
        ],
      })

      this.props.navigation.dispatch(resetAction)
    }
  }
  render() {
    const { theme, navigation, isDarkTheme, settings } = this.props
    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    const selectedRecipes = Object.keys(settings.recipes).filter(
      v => settings.recipes[v]
    )
    const menuRecipes = Object.values(selectedRecipes).map(sr => recipes[sr])

    return (
      <HeaderScrollView
        title="Brew Methods"
        containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
        headerComponentContainerStyle={{
          backgroundColor: isDarkTheme ? modifiedTheme.grey2 : theme.background,
        }}
        headerComponentStyle={{
          backgroundColor: modifiedTheme.grey1,
        }}
        headlineStyle={{ color: modifiedTheme.foreground }}
        titleStyle={{
          color: modifiedTheme.foreground,
          marginBottom: 24,
          marginLeft: 0,
        }}
        scrollContainerStyle={{
          backgroundColor: modifiedTheme.grey1,
          paddingBottom: 32,
          paddingHorizontal: 12,
        }}
        fadeDirection="up"
      >
        {menuRecipes.map(recipe => (
          <ListItem
            recipe={recipe}
            key={recipe.id}
            onPress={() => navigation.navigate('Brew', { id: recipe.id })}
          />
        ))}
        {menuRecipes.length === 0 && (
          <ScreenPlaceholder text="To start brewing, tap the settings icon, then Recipes, then select which brew methods you'd like to appear here." />
        )}
      </HeaderScrollView>
    )
  }
}

export default withSettings(withNavigation(withTheme(Menu) as any))
