import { createContext, use } from 'react';

type Theme = App.Storage.Local['themeMode'];

interface ThemeProviderState {
  theme: Theme;
  darkMode: boolean;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  darkMode: false,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
