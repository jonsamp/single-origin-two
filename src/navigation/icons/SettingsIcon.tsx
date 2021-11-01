import React from "react";
import { SettingsIcon as ExpoSettingsIcon } from "@expo/styleguide-native";
import { Icon } from "./types";

export default function SettingsIcon(props: Icon) {
  const { focused, theme } = props;

  return (
    <ExpoSettingsIcon
      size={26}
      color={focused ? theme?.brand?.default : theme?.icon?.default}
    />
  );
}
