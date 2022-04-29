import { iconSize, spacing } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';

import { useTailwind, useTheme } from '../../common/theme';
import { isMaxWidth } from '../../constants/layout';
import SettingsDetail from '../Settings/SettingsDetail';

function BrewSettings() {
  const navigation = useNavigation();
  const tw = useTailwind();
  const { theme } = useTheme();

  return (
    <View style={tw('flex-1')}>
      {!isMaxWidth && Platform.select({ ios: <StatusBar animated style="light" /> })}
      {Platform.select({
        ios: (
          <View
            style={tw(
              'theme.background.default border-b theme.border.default p-4 flex-row items-center justify-between'
            )}>
            <View style={tw('flex-row items-center')}>
              <Feather name="sliders" color={theme.icon.default} size={iconSize.regular} />
              <Text style={tw('headline ml-3 theme.text.default')}>Brew Settings</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw('pr-1')}>
              <Text style={tw('headline theme.text.default')}>Save</Text>
            </TouchableOpacity>
          </View>
        ),
      })}
      <ScrollView>
        <SettingsDetail title="brew-settings" />
        <View style={{ top: -spacing[8] }}>
          <SettingsDetail title="units" />
        </View>
      </ScrollView>
    </View>
  );
}

export default BrewSettings;
