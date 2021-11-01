import React, { Component, Fragment } from "react";
import { Platform, ScrollView, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { StackParams } from "../../navigation";
import { grinders } from "../../constants/grinders";
import recipes from "../../constants/recipes";
import { tempUnits, weightUnits } from "../../constants/units";
import withSettings from "../../providers/settings";
import withTheme from "../../providers/theme";
import { Settings as SettingsType } from "../../state/settings/types";
import { Theme } from "../../types/index";
import ChecklistSetting from "./ChecklistSetting";
import Group from "./Group";
import InputSetting from "./InputSetting";
import PrivacyPolicy from "./PrivacyPolicy";
import Section from "./Section";
import SwitchSetting from "./SwitchSetting";
import SettingWrapper from "./SettingWrapper";

interface SettingsProps {
  theme: Theme;
  settings: SettingsType;
  settingUpdated: (props: any) => void;
  navigation: StackNavigationProp<StackParams, "SettingsDetail">;
  route: RouteProp<StackParams, "SettingsDetail">;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  toggleAutoTheme: () => void;
  insets: {
    bottom: number;
  };
}

class SettingsDetail extends Component<SettingsProps> {
  createChecklistItems = ({ list, settingName }) =>
    Object.values(list).map((item: any) => ({
      ...item,
      value: item.id === this.props.settings[settingName],
    }));

  createRecipesCheckList = () =>
    Object.values(recipes).map((recipe) => ({
      ...recipe,
      value: this.props.settings.recipes[recipe.id],
    }));

  recipeUpdated = ({ recipe }) =>
    this.props.settingUpdated({
      setting: "recipes",
      value: {
        ...this.props.settings.recipes,
        [recipe]: !this.props.settings.recipes[recipe],
      },
    });

  render() {
    const {
      theme,
      settings,
      settingUpdated,
      isDarkTheme,
      toggleTheme,
      toggleAutoTheme,
      navigation,
      route,
    } = this.props;
    const groupName = route.params.title;
    let children;

    switch (groupName.toLowerCase().replace(" ", "-")) {
      case "brew-settings":
        children = (
          <Fragment>
            <Section>
              <InputSetting
                title="Coffee to water ratio"
                description="Grams of water to grams of coffee ratio. Smaller numbers produce stronger coffee. Default: 16."
                value={settings.ratio}
                onChange={(value) =>
                  settingUpdated({ setting: "ratio", value })
                }
              />
              <InputSetting
                title="Bloom time"
                description="The number of seconds for the bloom. Default: 45 seconds."
                value={settings.bloomDuration}
                onChange={(value) =>
                  settingUpdated({ setting: "bloomDuration", value })
                }
                borderTop
              />
              <SwitchSetting
                title="Record grind setting"
                value={settings.recordGrind}
                onChange={(value) =>
                  settingUpdated({ setting: "recordGrind", value })
                }
                borderTop
              />
              <SwitchSetting
                title="Record temperature"
                description="Record temperature and grind setting while brewing."
                value={settings.recordTemp}
                onChange={(value) =>
                  settingUpdated({ setting: "recordTemp", value })
                }
              />
            </Section>
          </Fragment>
        );
        break;
      case "grinder":
        children = (
          <Fragment>
            <Section>
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: grinders,
                  settingName: "grinderType",
                })}
                onChange={(value) =>
                  settingUpdated({ setting: "grinderType", value })
                }
              />
            </Section>
          </Fragment>
        );
        break;
      case "units":
        children = (
          <Fragment>
            <Section title="Temperature units">
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: tempUnits,
                  settingName: "temperatureUnit",
                })}
                onChange={(value) =>
                  settingUpdated({ setting: "temperatureUnit", value })
                }
              />
            </Section>
            <Section
              title="Brewed coffee volume units"
              description="The units that represent the volume of brewed coffee you’d like to make."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: "brewedVolumeUnit",
                })}
                onChange={(value) =>
                  settingUpdated({ setting: "brewedVolumeUnit", value })
                }
              />
            </Section>
            <Section
              title="Coffee weight units"
              description="The units that represent the weight of coffee beans you’ll need to grind."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: "coffeeWeightUnit",
                })}
                onChange={(value) =>
                  settingUpdated({ setting: "coffeeWeightUnit", value })
                }
              />
            </Section>
            <Section
              title="Water volume units"
              description="The units that represent the weight of water you’ll need to pour over."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: "waterVolumeUnit",
                })}
                onChange={(value) =>
                  settingUpdated({ setting: "waterVolumeUnit", value })
                }
              />
            </Section>
          </Fragment>
        );
        break;
      case "recipes":
        children = (
          <Fragment>
            <Section>
              <ChecklistSetting
                items={this.createRecipesCheckList()}
                onChange={(recipe) => this.recipeUpdated({ recipe })}
              />
            </Section>
          </Fragment>
        );
        break;
      case "app":
        children = (
          <Fragment>
            <Section>
              <SwitchSetting
                title="Dark mode"
                value={isDarkTheme}
                onChange={toggleTheme}
                disabled={settings.autoTheme}
              />
              {parseInt(String(Platform.Version), 10) >= 13 ? (
                <SwitchSetting
                  title={`Automatic theme`}
                  value={settings.autoTheme}
                  onChange={toggleAutoTheme}
                />
              ) : null}
              <Group
                title="View Get Started"
                onPress={() => navigation.navigate("Onboarding")}
              />
              <SwitchSetting
                title="Share anonymous data"
                description="Single Origin anonymously collects usage analytics of the app. This helps us develop new features and improve the overall user experience. If you prefer not to share your data, tap the toggle button to opt-out."
                value={settings.shareTrackingData}
                onChange={(value) =>
                  settingUpdated({ setting: "shareTrackingData", value })
                }
              />
            </Section>
            <SettingWrapper title="Version" borderTop>
              <Text style={{ color: theme.foreground }}>41.1 (7)</Text>
            </SettingWrapper>
          </Fragment>
        );
        break;
      case "privacy-policy":
        children = (
          <Fragment>
            <Section>
              <PrivacyPolicy />
            </Section>
          </Fragment>
        );
        break;
      default:
        children = null;
    }

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: this.props.insets.bottom }}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(withSettings(withSafeAreaInsets(SettingsDetail)));
