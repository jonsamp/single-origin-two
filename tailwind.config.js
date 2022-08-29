const { lightTheme, darkTheme } = require('@expo/styleguide-native/dist/styles/themes');

module.exports = {
  content: ['./src/**/*.tsx'],
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
  theme: {
    fontFamily: {
      script: ['Script'],
    },
    extend: {
      backgroundColor: {
        screen: {
          DEFAULT: lightTheme.background.screen,
          dark: darkTheme.background.screen,
        },
        default: {
          DEFAULT: lightTheme.background.default,
          dark: darkTheme.background.default,
        },
        secondary: {
          DEFAULT: lightTheme.background.secondary,
          dark: darkTheme.background.secondary,
        },
        tertiary: {
          DEFAULT: lightTheme.background.tertiary,
          dark: darkTheme.background.tertiary,
        },
        quaternary: {
          DEFAULT: lightTheme.background.quaternary,
          dark: darkTheme.background.quaternary,
        },
        overlay: {
          DEFAULT: lightTheme.background.overlay,
          dark: darkTheme.background.overlay,
        },
        warning: {
          DEFAULT: lightTheme.background.warning,
          dark: darkTheme.background.warning,
        },
      },
      colors: {
        brand: {
          DEFAULT: '#00b78e',
          dark: '#00CA9D',
        },
        default: {
          DEFAULT: lightTheme.text.default,
          dark: darkTheme.text.default,
        },
        secondary: {
          DEFAULT: lightTheme.text.secondary,
          dark: darkTheme.text.secondary,
        },
        warning: {
          DEFAULT: lightTheme.text.warning,
          dark: darkTheme.text.warning,
        },
      },
      borderColor: {
        default: {
          DEFAULT: lightTheme.border.default,
          dark: darkTheme.border.default,
        },
        warning: {
          DEFAULT: lightTheme.border.warning,
          dark: darkTheme.border.warning,
        },
      },
    },
  },
};
