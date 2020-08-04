import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import type from '../constants/type'
import withTheme from '../providers/theme'

import BrewIcon from './icons/BrewIcon'
import LogsIcon from './icons/LogsIcon'
import SettingsIcon from './icons/SettingsIcon'
import Logs from '../scenes/Logs'
import Menu from '../scenes/Menu'
import Settings from '../scenes/Settings'
import SettingsDetail from '../scenes/Settings/SettingsDetail'
import Onboarding from '../scenes/Onboarding'
import Preparation from '../scenes/Preparation'
import Brew from '../scenes/Brew'
import LogDetail from '../scenes/LogDetail'
import LogDetailEdit from '../scenes/LogDetailEdit'
import BrewSummary from '../scenes/BrewSummary'
import Test from '../scenes/Test'

export type StackParams = {
  Brew: {
    id: string
    title: string
  }
  LogDetail: {
    timestamp: number
  }
  SettingsDetail: {
    title: string
  }
  Tabs: undefined
  Onboarding: undefined
  Logs: undefined
  Settings: undefined
  Preparation: undefined
  BrewSummary: undefined
  LogDetailEdit: undefined
  Test: undefined
}

export type TabParams = {
  Menu: undefined
  Logs: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<TabParams>()
const Stack = createNativeStackNavigator<StackParams>()

function LogsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logs"
        component={Logs}
        options={{ headerLargeTitle: true, title: 'Notes' }}
      />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerLargeTitle: true }}
      />
    </Stack.Navigator>
  )
}

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
        component={LogsStack}
        options={{
          tabBarIcon: props => <LogsIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
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
          },
        }}
      >
        {/* <Stack.Screen name="Test" component={Test} /> */}
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
                onPress={() =>
                  navigation.navigate('SettingsDetail', { title: 'Units' })
                }
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
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="LogDetail"
          component={LogDetail}
          options={({ navigation, route }) => ({
            title: 'Brew Note',
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LogDetailEdit', {
                    timestamp: route.params.timestamp,
                  })
                }
              >
                <Text style={[type.body, { color: theme.foreground }]}>
                  Rate
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="LogDetailEdit"
          component={LogDetailEdit}
          options={{ stackPresentation: 'modal' }}
        />
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
