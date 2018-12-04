import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Brew from 'scenes/Brew';
import Logs from 'scenes/Logs';
import Settings from 'scenes/Settings';
import BrewIcon from './icons/BrewIcon';
import LogsIcon from './icons/LogsIcon';
import SettingsIcon from './icons/SettingsIcon';
import TabBar from './TabBar';

const TabNavigator = createBottomTabNavigator(
  {
    Brew,
    Logs,
    Settings,
  },
  {
    tabBarComponent: TabBar,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Brew':
            return <BrewIcon focused={focused} />;
          case 'Logs':
            return <LogsIcon focused={focused} />;
          case 'Settings':
            return <SettingsIcon focused={focused} />;
          default:
            return <BrewIcon focused={focused} />;
        }
      },
    }),
  }
);

export default createAppContainer(TabNavigator);
