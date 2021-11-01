import React, { ReactNode } from "react";
import { Text, View, ViewStyle } from "react-native";
import withTheme from "../../providers/theme";
import { Theme } from "../../types/index";
import styles from "./styles";

interface SettingWrapperProps {
  children: ReactNode;
  theme: Theme;
  title: string;
  description: string;
  borderTop: boolean;
  isDarkTheme: boolean;
  style: ViewStyle;
}

const SettingWrapper = ({
  children,
  theme,
  title,
  description,
  borderTop,
  isDarkTheme,
  style,
}: SettingWrapperProps) => (
  <View
    style={{ backgroundColor: isDarkTheme ? theme.background : theme.grey1 }}
  >
    <View
      style={{
        padding: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
        borderTopWidth: borderTop ? 1 : 0,
        borderTopColor: theme.border,
        ...style,
      }}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.title,
            { color: theme.foreground, textTransform: "capitalize" },
          ]}
        >
          {title}
        </Text>
        {children}
      </View>
    </View>
    {description ? (
      <View
        style={{
          padding: 16,
          paddingTop: 8,
          paddingBottom: 32,
        }}
      >
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
    ) : null}
  </View>
);

export default withTheme(SettingWrapper);
