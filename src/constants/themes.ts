export interface Theme {
  foreground: string
  text: string
  background: string
  notification: string
  primaryDark: string
  pageBackground: string
  navigationBackground: string
  primary: string
  beige: string
  warning: string
  grey1: string
  grey2: string
  grey3: string
  black: string
  blue: string
  border: string
  card: string
  iconSize: number
}

export const lightTheme = {
  dark: false,
  colors: {
    foreground: '#2B2B2B',
    text: '#2B2B2B',
    background: '#FFFFFF',
    pageBackground: '#F7F7F7',
    navigationBackground: '#FFFFFF',
    notification: '#FFFFFF',
    primaryDark: '#00A57D',
    primary: '#00b78e',
    grey1: '#F7F7F7',
    grey2: '#EFEFEF',
    grey3: '#adadad',
    border: '#EFEFEF',
    card: '#F7F7F7',
    iconSize: 22,
  },
}

export const darkTheme = {
  dark: true,
  colors: {
    foreground: '#d8d8d8',
    text: '#d8d8d8',
    background: '#000000',
    pageBackground: '#000000',
    navigationBackground: 'rgb(18, 18, 18)',
    notification: '#000000',
    primaryDark: '#00CA9D',
    primary: '#00CA9D',
    warning: '#57502D',
    grey2: '#171717',
    grey1: '#2B2B2B',
    grey3: '#4F4F4F',
    border: '#2B2B2B',
    card: 'rgb(18, 18, 18)',
    iconSize: 22,
  },
}

export const styleguide = {
  iconSize: 22,
  maxWidth: 560,
}
