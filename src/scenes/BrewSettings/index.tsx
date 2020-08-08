import React, { Component } from 'react'
import { View } from 'react-native'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import withTheme, { Theme } from '../../providers/theme'
import SettingsDetail from '../Settings/SettingsDetail'

interface BrewSettingsProps {
  theme: Theme
}

function BrewSettings({ theme }: BrewSettingsProps) {
  return (
    <ResponsiveScrollView
      wrapperStyle={{
        backgroundColor: theme.pageBackground,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
        paddingTop: -24,
      }}
    >
      <SettingsDetail route={{ params: { title: 'brew-settings' } }} />
      <View style={{ top: -40 }}>
        <SettingsDetail route={{ params: { title: 'units' } }} />
      </View>
    </ResponsiveScrollView>
  )
}

export default withTheme(BrewSettings)
