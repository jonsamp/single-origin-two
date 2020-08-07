import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import type from '../constants/type'
import { lightTheme, darkTheme } from '../constants/themes'
import withTheme, { useTheme } from '../providers/theme'
import { styleguide } from '../constants/themes'

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
  const colorScheme = useTheme()
  const { colors } = colorScheme.theme === 'dark' ? darkTheme : lightTheme

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.pageBackground,
        },
        headerStyle: {
          backgroundColor: colors.navigationBackground,
        },
      }}
    >
      <Stack.Screen
        name="Logs"
        component={Logs}
        options={{ headerLargeTitle: true, title: 'Notes' }}
      />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  const colorScheme = useTheme()
  const { colors } = colorScheme.theme === 'dark' ? darkTheme : lightTheme

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.pageBackground,
        },
        headerStyle: {
          backgroundColor: colors.navigationBackground,
        },
      }}
    >
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
          backgroundColor: theme.navigationBackground,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: props => (
            <BrewIcon focused={props.focused} theme={theme} />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsStack}
        options={{
          tabBarIcon: props => (
            <LogsIcon focused={props.focused} theme={theme} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: props => (
            <SettingsIcon focused={props.focused} theme={theme} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function App({ theme, isDarkTheme }) {
  return (
    <NavigationContainer theme={{ dark: isDarkTheme, colors: theme }}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: type.headline,
          headerBackTitleVisible: false,
          headerTintColor: theme.foreground,
          headerStyle: {
            backgroundColor: theme.navigationBackground,
          },
          contentStyle: {
            backgroundColor: theme.pageBackground,
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
                  size={styleguide.iconSize}
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
