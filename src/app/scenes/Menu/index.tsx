import { Feather } from '@expo/vector-icons'
import { Notifications } from 'expo'
import React, { Component } from 'react'
import { Text, TextStyle, TouchableOpacity, View } from 'react-native'
import HeaderScrollView from 'react-native-header-scroll-view'
import {
  NavigationActions,
  NavigationScreenProp,
  StackActions,
  withNavigation,
} from 'react-navigation'
import Card from '../../components/Card'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
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
        title="Brew methods"
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
        }}
        scrollContainerStyle={{
          backgroundColor: modifiedTheme.grey1,
          paddingBottom: 32,
        }}
        fadeDirection="up"
      >
        <View style={{ paddingHorizontal: 12 }}>
          {menuRecipes.map(recipe => (
            <Card key={recipe.id}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Brew', { id: recipe.id })}
                style={{ flexDirection: 'row' }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDarkTheme
                      ? theme.grey2
                      : theme.foreground,
                  }}
                >
                  {recipe.icon({
                    fill: isDarkTheme ? theme.foreground : theme.background,
                  })}
                </View>
                <View
                  style={{
                    padding: 20,
                    paddingVertical: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 0.8,
                  }}
                >
                  <Text
                    style={
                      {
                        color: theme.foreground,
                        ...type.headline,
                      } as TextStyle
                    }
                  >
                    {recipe.title} {recipe.modifier}
                  </Text>
                  <Feather
                    name="chevron-right"
                    size={theme.iconSize}
                    color={theme.foreground}
                  />
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </HeaderScrollView>
    )
  }
}

export default withSettings(withNavigation(withTheme(Menu) as any))
