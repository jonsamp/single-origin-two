import Brew from '@app/scenes/Brew'
import BrewSummary from '@app/scenes/BrewSummary'
import Logs from '@app/scenes/Logs'
import Menu from '@app/scenes/Menu'
import Settings from '@app/scenes/Settings'
import SettingsDetail from '@app/scenes/Settings/SettingsDetail'
import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import BrewIcon from './icons/BrewIcon'
import LogsIcon from './icons/LogsIcon'
import SettingsIcon from './icons/SettingsIcon'
import TabBar from './TabBar'

const TabNavigator = createBottomTabNavigator(
  {
    Menu,
    Logs,
    Settings: {
      screen: props => <Settings {...props} />,
    },
  },
  {
    tabBarComponent: TabBar,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        switch (routeName) {
          case 'Brew':
            return <BrewIcon focused={focused} />
          case 'Logs':
            return <LogsIcon focused={focused} />
          case 'Settings':
            return <SettingsIcon focused={focused} />
          default:
            return <BrewIcon focused={focused} />
        }
      },
    }),
  }
)

const StackNavigator = createStackNavigator(
  { TabNavigator, SettingsDetail, Brew, BrewSummary },
  { defaultNavigationOptions: { header: null } }
)

export default createAppContainer(StackNavigator)
