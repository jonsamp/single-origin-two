import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import Brew from '../../scenes/Brew'
import BrewSummary from '../../scenes/BrewSummary'
import Logs from '../../scenes/Logs'
import Menu from '../../scenes/Menu'
import Preparation from '../../scenes/Preparation'
import Settings from '../../scenes/Settings'
import SettingsDetail from '../../scenes/Settings/SettingsDetail'
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
  { TabNavigator, SettingsDetail, Brew, BrewSummary, Preparation },
  { defaultNavigationOptions: { header: null } }
)

export default createAppContainer(StackNavigator)
