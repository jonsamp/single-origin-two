import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
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
import LogDetail from '../../scenes/LogDetail'
import LogDetailEdit from '../../scenes/LogDetailEdit'
import BrewSummary from '../../scenes/BrewSummary'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function Tabs({ theme }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: theme.background,
          borderTopColor: theme.grey3,
        },
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
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomColor: 'red',
          },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={withTheme(Tabs)}
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
            headerStyle: {
              borderBottomColor: theme.grey3,
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
        <Stack.Screen name="LogDetail" component={LogDetail} />
        <Stack.Screen name="LogDetailEdit" component={LogDetailEdit} />
        <Stack.Screen
          name="BrewSummary"
          component={BrewSummary}
          options={{ gestureEnabled: false, title: 'Brew Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withTheme(App)
