import { iconSize } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Linking, TouchableOpacity, ScrollView, Platform } from 'react-native';

import { useTailwind, useTheme } from '../../common/theme';
import { Separator } from '../../components/Separator';
import Group from './Group';
import Section from './Section';
import SettingWrapper from './SettingWrapper';
import BrewSettingsImageDark from './icons/brew-settings-dark.png';
import BrewSettingsImage from './icons/brew-settings.png';
import GrinderImageDark from './icons/grinder-dark.png';
import GrinderImage from './icons/grinder.png';
import RecipesImageDark from './icons/recipes-dark.png';
import RecipesImage from './icons/recipes.png';
import UnitsImageDark from './icons/units-dark.png';
import UnitsImage from './icons/units.png';

function Settings() {
  const { theme, dark } = useTheme();
  const tw = useTailwind();

  return (
    <ScrollView style={tw('theme.background.screen px-4')}>
      <Section title="Brewing">
        <Group title="Brew Settings" icon={dark ? BrewSettingsImageDark : BrewSettingsImage} />
        <Separator leftWidth="w-16" />
        <Group title="Grinder" icon={dark ? GrinderImageDark : GrinderImage} />
        <Separator leftWidth="w-16" />
        <Group title="Units" icon={dark ? UnitsImageDark : UnitsImage} />
        <Separator leftWidth="w-16" />
        <Group title="Recipes" icon={dark ? RecipesImageDark : RecipesImage} />
      </Section>
      <Section title="General">
        <Group title="App" />
        <Separator />
        <Group title="Privacy Policy" />
        <Separator />
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
          <SettingWrapper title="Rate Single Origin">
            <Feather name="star" size={iconSize.regular} color={theme.icon.secondary} />
          </SettingWrapper>
        </TouchableOpacity>
      </Section>
    </ScrollView>
  );
}

export default Settings;
