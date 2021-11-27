import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Fragment } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import { useTailwind } from '../../common/theme';
import { grinders } from '../../constants/grinders';
import { recipes } from '../../constants/recipes';
import { tempUnits, weightUnits } from '../../constants/units';
import { RootStackParamList } from '../../navigation';
import withSettings from '../../providers/settings';
import { Settings as SettingsType } from '../../state/settings/types';
import ChecklistSetting from './ChecklistSetting';
import Group from './Group';
import InputSetting from './InputSetting';
import PrivacyPolicy from './PrivacyPolicy';
import Section from './Section';
import SettingWrapper from './SettingWrapper';
import SwitchSetting from './SwitchSetting';

type Props = {
  settings: SettingsType;
  settingUpdated: (props: any) => void;
  navigation: StackNavigationProp<RootStackParamList, 'SettingsDetail'>;
  route: RouteProp<RootStackParamList, 'SettingsDetail'>;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  toggleAutoTheme: () => void;
  insets: {
    bottom: number;
  };
};

function SettingsDetail(props: Props) {
  const { settings, settingUpdated, navigation, route, insets } = props;
  const tw = useTailwind();
  const groupName = route.params.title;
  let children;

  function createChecklistItems({ list, settingName }) {
    return Object.values(list).map((item: any) => ({
      ...item,
      value: item.id === settings[settingName],
    }));
  }

  function createRecipesCheckList() {
    return Object.values(recipes).map((recipe) => ({
      ...recipe,
      value: settings.recipes[recipe.id],
    }));
  }

  function recipeUpdated({ recipe }) {
    return settingUpdated({
      setting: 'recipes',
      value: {
        ...settings.recipes,
        [recipe]: !settings.recipes[recipe],
      },
    });
  }

  switch (groupName.toLowerCase().replace(' ', '-')) {
    case 'brew-settings':
      children = (
        <>
          <Section>
            <InputSetting
              title="Coffee to water ratio"
              description="Grams of water to grams of coffee ratio. Smaller numbers produce stronger coffee. Default: 16."
              value={settings.ratio}
              onChange={(value) => settingUpdated({ setting: 'ratio', value })}
            />
            <InputSetting
              title="Bloom time"
              description="The number of seconds for the bloom. Default: 45 seconds."
              value={settings.bloomDuration}
              onChange={(value) => settingUpdated({ setting: 'bloomDuration', value })}
              borderTop
            />
            <SwitchSetting
              title="Record grind setting"
              value={settings.recordGrind}
              onChange={(value) => settingUpdated({ setting: 'recordGrind', value })}
              borderTop
            />
            <SwitchSetting
              title="Record temperature"
              description="Record temperature and grind setting while brewing."
              value={settings.recordTemp}
              onChange={(value) => settingUpdated({ setting: 'recordTemp', value })}
            />
          </Section>
        </>
      );
      break;
    case 'grinder':
      children = (
        <>
          <Section>
            <ChecklistSetting
              items={createChecklistItems({
                list: grinders,
                settingName: 'grinderType',
              })}
              onChange={(value) => settingUpdated({ setting: 'grinderType', value })}
            />
          </Section>
        </>
      );
      break;
    case 'units':
      children = (
        <>
          <Section title="Temperature units">
            <ChecklistSetting
              items={createChecklistItems({
                list: tempUnits,
                settingName: 'temperatureUnit',
              })}
              onChange={(value) => settingUpdated({ setting: 'temperatureUnit', value })}
            />
          </Section>
          <Section
            title="Brewed coffee volume units"
            description="The units that represent the volume of brewed coffee you’d like to make.">
            <ChecklistSetting
              items={createChecklistItems({
                list: weightUnits,
                settingName: 'brewedVolumeUnit',
              })}
              onChange={(value) => settingUpdated({ setting: 'brewedVolumeUnit', value })}
            />
          </Section>
          <Section
            title="Coffee weight units"
            description="The units that represent the weight of coffee beans you’ll need to grind.">
            <ChecklistSetting
              items={createChecklistItems({
                list: weightUnits,
                settingName: 'coffeeWeightUnit',
              })}
              onChange={(value) => settingUpdated({ setting: 'coffeeWeightUnit', value })}
            />
          </Section>
          <Section
            title="Water volume units"
            description="The units that represent the weight of water you’ll need to pour over.">
            <ChecklistSetting
              items={createChecklistItems({
                list: weightUnits,
                settingName: 'waterVolumeUnit',
              })}
              onChange={(value) => settingUpdated({ setting: 'waterVolumeUnit', value })}
            />
          </Section>
        </>
      );
      break;
    case 'recipes':
      children = (
        <>
          <Section>
            <ChecklistSetting
              items={createRecipesCheckList()}
              onChange={(recipe) => recipeUpdated({ recipe })}
            />
          </Section>
        </>
      );
      break;
    case 'app':
      children = (
        <>
          <Section>
            <Group title="View Get Started" onPress={() => navigation.navigate('Onboarding')} />
            <SwitchSetting
              title="Share anonymous data"
              description="Single Origin anonymously collects usage analytics of the app. This helps us develop new features and improve the overall user experience. If you prefer not to share your data, tap the toggle button to opt-out."
              value={settings.shareTrackingData}
              onChange={(value) => settingUpdated({ setting: 'shareTrackingData', value })}
            />
          </Section>
          <SettingWrapper title="Version" borderTop>
            <Text style={tw('body theme.text.default')}>43 (3)</Text>
          </SettingWrapper>
        </>
      );
      break;
    case 'privacy-policy':
      children = (
        <>
          <Section>
            <PrivacyPolicy />
          </Section>
        </>
      );
      break;
    default:
      children = null;
  }

  return (
    <View style={tw('flex-1 theme.background.default')}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>{children}</ScrollView>
    </View>
  );
}

export default withSettings(withSafeAreaInsets(SettingsDetail));
