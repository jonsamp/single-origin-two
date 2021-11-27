import { useSelector } from 'react-redux';

import { lightTheme, darkTheme, styleguide } from '../constants/themes';
import { selectSettings } from '../state/settings/selectors';
import { State } from '../state/types';
import { Theme as ThemeType } from '../types';

export type Theme = ThemeType;

export interface Styleguide {
  iconSize: number;
  maxWidth: number;
}

const mapStateToProps = (state: State) => ({
  theme: selectSettings(state).theme,
  autoTheme: selectSettings(state).autoTheme,
});

export function useColorScheme() {
  return useSelector(mapStateToProps);
}

export function useTheme() {
  const { theme } = useColorScheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return {
    ...colors,
    styleguide,
    isDarkTheme: theme === 'dark',
    isLightTheme: theme === 'light',
  };
}
