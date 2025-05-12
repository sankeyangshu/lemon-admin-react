import { createContext, useContext } from 'react';
import type { ThemeModeType } from 'ahooks/lib/useTheme';

export const DARK_CLASS = 'dark';

export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export type ThemeContextType = {
  darkMode: boolean;
  themeScheme: ThemeModeType;
  setThemeScheme: (themeScheme: ThemeModeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  themeScheme: 'light',
  setThemeScheme: () => {},
});

/**
 * Toggle css dark mode
 * @descCN 切换css暗黑模式
 * @param darkMode Is dark mode
 */
export const toggleCssDarkMode = (darkMode = false) => {
  const htmlElementClassList = document.documentElement.classList;

  if (darkMode) {
    htmlElementClassList.add(DARK_CLASS);
  } else {
    htmlElementClassList.remove(DARK_CLASS);
  }
};

/**
 * use theme hook
 * @descCN 使用主题hook
 */
export const useThemeContext = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
};
