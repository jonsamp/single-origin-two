import React, { Component, ReactNode } from "react";
import { Text, TextStyle, View } from "react-native";
import type from "../../constants/type";
import withTheme from "../../providers/theme";
import { Theme } from "../../types/index";
import styles from "./styles";

interface SectionProps {
  title: string;
  description: string;
  theme: Theme;
  children: ReactNode;
}

class Section extends Component<SectionProps> {
  static defaultProps = {
    title: "",
  };

  render() {
    const { title, description, theme, children } = this.props;

    return (
      <View>
        <View
          style={{
            marginTop: 24,
            borderBottomWidth: description ? 0 : 1,
            borderBottomColor: theme.border,
            paddingBottom: 8,
          }}
        >
          <Text
            style={
              [
                type.label,
                {
                  color: theme.foreground,
                  opacity: 0.9,
                  paddingLeft: 16,
                  letterSpacing: 0.25,
                },
              ] as TextStyle
            }
          >
            {title.toUpperCase()}
          </Text>
        </View>
        {description ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              paddingTop: 0,
              marginTop: -4,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <Text
              style={[
                styles.description,
                { color: theme.foreground, opacity: 0.9 },
              ]}
            >
              {description}
            </Text>
          </View>
        ) : null}
        <View style={{ backgroundColor: theme.background }}>{children}</View>
      </View>
    );
  }
}

export default withTheme(Section);
