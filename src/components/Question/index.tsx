import React from "react";
import { Text, View } from "react-native";
import type from "../../constants/type";
import withTheme from "../../providers/theme";

interface QuestionProps {
  theme: any;
  title: string;
  description: string;
}

function Question({ title, description, theme }: QuestionProps) {
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          ...type.headline,
          color: theme.foreground,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            ...type.callout,
            opacity: 0.9,
            color: theme.foreground,
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

export default withTheme(Question);
