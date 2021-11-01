import React from "react";
import { Text, View } from "react-native";
import withTheme from "../../providers/theme";
import { Theme } from "../../types";
import styles from "./styles";

interface ScreenPlaceholderProps {
  theme: Theme;
  text: string;
}

function ScreenPlaceholder(props: ScreenPlaceholderProps) {
  const { theme, text } = props;
  return (
    <View style={styles.placeholderContainer}>
      <Text
        style={[
          styles.placeholderText,
          {
            color: theme.foreground,
            opacity: 0.75,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

export default withTheme(ScreenPlaceholder);
