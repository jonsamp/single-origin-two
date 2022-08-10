import { iconSize, spacing } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import { Text } from '../../components/Text';
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
              'bg-default dark:bg-default-dark border-b border-default dark:border-default-dark p-4 flex-row items-center justify-between'
            )}>
            <View style={tw('flex-row items-center')}>
              <Feather name="sliders" color={theme.icon.default} size={iconSize.regular} />
              <Text type="headline" style={tw('ml-3')}>
                Brew Settings
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw('pr-1')}>
              <Text type="headline">Save</Text>
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
