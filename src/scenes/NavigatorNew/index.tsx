import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import type from '../../constants/type'
import withTheme from '../../providers/theme'

import BrewIcon from './icons/BrewIcon'
import LogsIcon from './icons/LogsIcon'
import SettingsIcon from './icons/SettingsIcon'
import Logs from '../../scenes/Logs'
import Menu from '../../scenes/Menu'
import Settings from '../../scenes/Settings'
import SettingsDetail from '../../scenes/Settings/SettingsDetail'
import Onboarding from '../../scenes/Onboarding'
import Preparation from '../../scenes/Preparation'
import Brew from '../../scenes/Brew'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: props => <BrewIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="Logs"
        component={Logs}
        options={{
          tabBarIcon: props => <LogsIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: props => <SettingsIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  )
}

function App({ theme }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: type.headline,
          headerBackTitleVisible: false,
          headerTintColor: theme.foreground,
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ title: 'Get started' }}
        />
        <Stack.Screen
          name="Brew"
          component={Brew}
          options={({ route, navigation }) => ({
            title: route.params.title,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsDetail', 'Units')}
              >
                <Feather
                  name="sliders"
                  color={theme.foreground}
                  size={theme.iconSize}
                />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: {
              right: 8,
            },
          })}
        />
        <Stack.Screen name="Preparation" component={Preparation} />
        <Stack.Screen
          name="SettingsDetail"
          component={SettingsDetail}
          options={({ route }) => ({
            title: route.params,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withTheme(App)
