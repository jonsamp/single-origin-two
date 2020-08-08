import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import withTheme, { Theme } from '../../providers/theme'
import SettingsDetail from '../Settings/SettingsDetail'
import type from '../../constants/type'
import { isMaxWidth } from '../../constants/layout'

interface BrewSettingsProps {
  theme: Theme
}

function BrewSettings({ theme }: BrewSettingsProps) {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      {!isMaxWidth &&
        Platform.select({ ios: <StatusBar animated style="light" /> })}
      {Platform.select({
        ios: (
          <View
            style={{
              backgroundColor: theme.background,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather
                name="sliders"
                color={theme.foreground}
                size={theme.iconSize}
              />
              <Text
                style={{ ...type.headline, fontWeight: '600', marginLeft: 12 }}
              >
                Brew Settings
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingRight: 4 }}
            >
              <Text style={type.headline}>Save</Text>
            </TouchableOpacity>
          </View>
        ),
      })}
      <ResponsiveScrollView
        wrapperStyle={{
          backgroundColor: theme.pageBackground,
        }}
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingTop: -24,
          marginTop: -24,
        }}
      >
        <SettingsDetail route={{ params: { title: 'brew-settings' } }} />
        <View style={{ top: -32 }}>
          <SettingsDetail route={{ params: { title: 'units' } }} />
        </View>
      </ResponsiveScrollView>
    </View>
  )
}

export default withTheme(BrewSettings)
