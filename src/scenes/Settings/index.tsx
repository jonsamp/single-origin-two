import { iconSize } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Linking, TouchableOpacity, ScrollView, Platform } from 'react-native';

import { useTailwind, useTheme } from '../../common/theme';
import Group from './Group';
import Section from './Section';
import SettingWrapper from './SettingWrapper';

function Settings() {
  const { theme } = useTheme();
  const tw = useTailwind();

  return (
    <ScrollView style={tw('theme.background.default')}>
      <Section title="Brewing">
        <Group title="Brew Settings" />
        <Group title="Grinder" />
        <Group title="Units" />
        <Group title="Recipes" />
      </Section>
      <Section title="General">
        <Group title="App" />
        <Group title="Privacy Policy" />
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('https://itunes.apple.com/app/id1480168613?action=write-review');
            } else {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.jonsamp.singleorigintwo'
              );
            }
          }}>
          <SettingWrapper title="Rate Single Origin 2">
            <Feather name="star" size={iconSize.regular} color={theme.icon.secondary} />
          </SettingWrapper>
        </TouchableOpacity>
      </Section>
    </ScrollView>
  );
}

export default Settings;
