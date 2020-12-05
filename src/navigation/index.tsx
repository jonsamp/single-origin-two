import React from 'react'
import { TouchableOpacity, Text, View, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
import BrewSettings from '../scenes/BrewSettings'
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
  Menu: undefined
  Tabs: undefined
  Onboarding: undefined
  Logs: undefined
  Settings: undefined
  Preparation: undefined
  BrewSummary: undefined
  LogDetailEdit: undefined
  Test: undefined
  BrewSettings: undefined
}

export type TabParams = {
  Menu: undefined
  Logs: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<TabParams>()
const Stack = createNativeStackNavigator<StackParams>()

function MenuStack() {
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
        name="Menu"
        component={Menu}
        options={{
          headerCenter: () => <View style={{ flex: 1 }} />,
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // position: 'absolute',
                // left: 0,
              }}
            >
              <BrewIcon theme={colors} focused={false} size={30} />
              <Text
                style={{ ...type.headline, marginLeft: 10, color: colors.text }}
              >
                Single Origin 2
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

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

function Tabs() {
  const colorScheme = useTheme()
  const { colors } = colorScheme.theme === 'dark' ? darkTheme : lightTheme
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.navigationBackground,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarIcon: (props) => (
            <BrewIcon focused={props.focused} theme={colors} />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsStack}
        options={{
          tabBarIcon: (props) => (
            <LogsIcon focused={props.focused} theme={colors} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: (props) => (
            <SettingsIcon focused={props.focused} theme={colors} />
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
          headerTitleStyle: type.headline as any,
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
                onPress={() => navigation.navigate('BrewSettings')}
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
                <Text style={[type.headline, { color: theme.foreground }]}>
                  Edit
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="LogDetailEdit"
          component={LogDetailEdit}
          options={{
            stackPresentation: Platform.select({
              ios: 'modal',
              android: 'push',
            }),
            headerShown: Platform.select({
              ios: false,
              android: true,
            }),
            title: 'Edit Note',
          }}
        />
        <Stack.Screen
          name="BrewSettings"
          component={BrewSettings}
          options={{
            headerShown: Platform.select({
              ios: false,
              android: true,
            }),
            stackPresentation: Platform.select({
              ios: 'modal',
              android: 'push',
            }),
            title: 'Brew Settings',
          }}
        />
        <Stack.Screen
          name="BrewSummary"
          component={BrewSummary}
          options={{
            gestureEnabled: false,
            title: 'Brew Summary',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withTheme(App)
