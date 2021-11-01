import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ResponsiveScrollView from "../../components/ResponsiveScrollView";
import withTheme, { Theme } from "../../providers/theme";
import SettingsDetail from "../Settings/SettingsDetail";
import type from "../../constants/type";
import { isMaxWidth } from "../../constants/layout";

interface BrewSettingsProps {
  theme: Theme;
  isDarkTheme: boolean;
}

function BrewSettings({ theme, isDarkTheme }: BrewSettingsProps) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? theme.grey2 : theme.grey1,
      }}
    >
      {!isMaxWidth &&
        Platform.select({ ios: <StatusBar animated style="light" /> })}
      {Platform.select({
        ios: (
          <View
            style={{
              backgroundColor: theme.navigationBackground,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather
                name="sliders"
                color={theme.foreground}
                size={theme.iconSize}
              />
              <Text
                style={{
                  ...type.headline,
                  fontWeight: "600",
                  marginLeft: 12,
                  color: theme.text,
                }}
              >
                Brew Settings
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingRight: 4 }}
            >
              <Text style={[type.headline, { color: theme.text }]}>Save</Text>
            </TouchableOpacity>
          </View>
        ),
      })}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingTop: -24,
          marginTop: -24,
        }}
      >
        <SettingsDetail route={{ params: { title: "brew-settings" } }} />
        <View style={{ top: -32 }}>
          <SettingsDetail route={{ params: { title: "units" } }} />
        </View>
      </ScrollView>
    </View>
  );
}

export default withTheme(BrewSettings);
