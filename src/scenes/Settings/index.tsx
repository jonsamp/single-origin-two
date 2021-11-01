import { Feather } from "@expo/vector-icons";
import React, { Component } from "react";
import { Linking, TouchableOpacity, ScrollView, Platform } from "react-native";
import withTheme from "../../providers/theme";
import { Theme } from "../../types/index";
import Group from "./Group";
import Section from "./Section";
import SettingWrapper from "./SettingWrapper";

interface SettingsProps {
  theme: Theme;
  isDarkTheme: boolean;
  navigation: any;
}

class Settings extends Component<SettingsProps> {
  render() {
    const { theme } = this.props;

    return (
      <ScrollView style={{ backgroundColor: theme.pageBackground }}>
        <Section title="Brewing">
          <Group title="Brew Settings" />
          <Group title="Grinder" />
          <Group title="Units" />
          <Group title="Recipes" />
        </Section>
        <Section title="General">
          <Group title="App" />
          <Group title="Privacy Policy" />
          {/* <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'mailto:sampjon@gmail.com?subject=Single%20Origin%20Feedback'
              )
            }
          >
            <SettingWrapper title="Send feedback">
              <Feather
                name="mail"
                size={modifiedTheme.iconSize}
                color={modifiedTheme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "ios") {
                Linking.openURL(
                  "https://itunes.apple.com/app/id1480168613?action=write-review"
                );
              } else {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.jonsamp.singleorigintwo"
                );
              }
            }}
          >
            <SettingWrapper title="Rate Single Origin 2">
              <Feather
                name="star"
                size={theme.iconSize}
                color={theme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => Linking.openURL('http://mbox.coffee/OGCC')}
          >
            <SettingWrapper title="$10 off Mistobox">
              <Feather
                name="external-link"
                size={theme.iconSize}
                color={theme.foreground}
                style={{ opacity: 0.65 }}
              />
            </SettingWrapper>
          </TouchableOpacity> */}
        </Section>
      </ScrollView>
    );
  }
}

export default withTheme(Settings);
