import { create } from "tailwind-rn";
import styles from "tailwind-rn/styles.json";
import {
  useTheme as RNUseTheme,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  lightTheme,
  darkTheme as styleguideDarkTheme,
} from "@expo/styleguide-native";
import { typography } from "./typography";

export const defaultTheme = {
  dark: false,
  colors: {
    primary: lightTheme.icon.default,
    background: lightTheme.background.default,
    card: lightTheme.background.overlay,
    text: lightTheme.text.default,
    border: lightTheme.border.default,
    notification: DefaultTheme.colors.notification,
  },
  theme: {
    ...lightTheme,
    brand: {
      default: "#00b78e",
      dark: "#00A57D",
    },
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: styleguideDarkTheme.background.default,
    border: styleguideDarkTheme.border.default,
    card: styleguideDarkTheme.background.overlay,
    primary: styleguideDarkTheme.icon.default,
    text: styleguideDarkTheme.text.default,
    notification: DarkTheme.colors.notification,
  },
  theme: {
    ...styleguideDarkTheme,
    brand: {
      default: "#00CA9D",
      dark: "#00CA9D",
    },
  },
};

type Theme = {
  dark: boolean;
  colors: Colors;
  theme: typeof lightTheme & {
    brand: {
      default: string;
      dark: string;
    };
  };
};

type Colors = {
  background: string;
  shadow: string;
  border: string;
  card: string;
  primary: string;
  text: string;
  notification: string;
};

export function useTheme() {
  const theme = RNUseTheme();

  return theme as Theme;
}

export function useTailwind() {
  // @ts-ignore
  const { theme, dark } = RNUseTheme();

  const custom = create({
    ...styles,
    "theme.background.default": {
      backgroundColor: theme.background.default,
    },
    "theme.background.overlay": {
      backgroundColor: theme.background.overlay,
    },
    "theme.background.secondary": {
      backgroundColor: theme.background.secondary,
    },
    "theme.background.tertiary": {
      backgroundColor: theme.background.tertiary,
    },
    "theme.background.quaternary": {
      backgroundColor: theme.background.quaternary,
    },
    "theme.border.default": {
      borderColor: theme.border.default,
    },
    "theme.text.default": {
      color: theme.text.default,
    },
    ...typography,
  });

  return custom.tailwind;
}
