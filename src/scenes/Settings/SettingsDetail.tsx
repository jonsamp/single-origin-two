import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTailwind } from '../../common/theme';
import { useSettings } from '../../common/useSettings';
import { Separator } from '../../components/Separator';
import { grinders } from '../../constants/grinders';
import { recipes } from '../../constants/recipes';
import { tempUnits, weightUnits } from '../../constants/units';
import { RootStackParamList } from '../../navigation';
import ChecklistSetting from './ChecklistSetting';
import Group from './Group';
import InputSetting from './InputSetting';
import PrivacyPolicy from './PrivacyPolicy';
import Section from './Section';
import SettingWrapper from './SettingWrapper';
import SwitchSetting from './SwitchSetting';

type Props = {
  route?: RouteProp<RootStackParamList, 'SettingsDetail'>;
  title?: string;
};

function SettingsDetail(props: Props) {
  const { route, title } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SettingsDetail'>>();
  const { settings, settingUpdated } = useSettings();
  const insets = useSafeAreaInsets();
  const tw = useTailwind();
  const groupName = route?.params?.title ?? title;
  let children;

  function createChecklistItems({
    list,
    settingName,
  }: {
    list: { [i: string]: any };
    settingName: string;
  }) {
    return Object.values(list).map((item: any) => ({
      ...item,
      value: item.id === settings[settingName as keyof typeof settings],
    }));
  }

  function createRecipesCheckList() {
    return Object.values(recipes).map((recipe) => ({
      ...recipe,
      value: settings.recipes[recipe.id],
    }));
  }

  function recipeUpdated({ recipe }: { recipe: string }) {
    return settingUpdated({
      key: 'recipes',
      value: {
        ...settings.recipes,
        [recipe]: !settings.recipes[recipe],
      },
    });
  }

  switch ((groupName ?? '').toLowerCase().replace(' ', '-')) {
    case 'brew-settings':
      children = (
        <>
          <Section description="Grams of water to grams of coffee ratio. Smaller numbers produce stronger coffee. Default: 16.">
            <InputSetting
              title="Coffee to water ratio"
              value={settings.ratio}
              onChange={(value) => settingUpdated({ key: 'ratio', value })}
            />
          </Section>
          <Section description="The number of seconds for the bloom. Default: 45 seconds.">
            <InputSetting
              title="Bloom time"
              value={settings.bloomDuration}
              onChange={(value) => settingUpdated({ key: 'bloomDuration', value })}
            />
          </Section>
          <Section description="Record temperature and grind setting while brewing.">
            <SwitchSetting
              title="Record grind setting"
              value={settings.recordGrind}
              onChange={(value) => settingUpdated({ key: 'recordGrind', value })}
            />
            <Separator />
            <SwitchSetting
              title="Record temperature"
              value={settings.recordTemp}
              onChange={(value) => settingUpdated({ key: 'recordTemp', value })}
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
              onChange={(value) => settingUpdated({ key: 'grinderType', value })}
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
              onChange={(value) => settingUpdated({ key: 'temperatureUnit', value })}
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
              onChange={(value) => settingUpdated({ key: 'brewedVolumeUnit', value })}
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
              onChange={(value) => settingUpdated({ key: 'coffeeWeightUnit', value })}
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
              onChange={(value) => settingUpdated({ key: 'waterVolumeUnit', value })}
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
          </Section>
          <Section description="Single Origin anonymously collects usage analytics of the app. This helps us develop new features and improve the overall user experience. If you prefer not to share your data, tap the toggle button to opt-out.">
            <SwitchSetting
              title="Share anonymous data"
              value={settings.shareTrackingData}
              onChange={(value) => settingUpdated({ key: 'shareTrackingData', value })}
            />
          </Section>
          <Section>
            <SettingWrapper title="Version">
              <Text style={tw('body theme.text.default')}>43 (5)</Text>
            </SettingWrapper>
          </Section>
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
    <View style={tw('flex-1 theme.background.screen px-4')}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>{children}</ScrollView>
    </View>
  );
}

export default SettingsDetail;
