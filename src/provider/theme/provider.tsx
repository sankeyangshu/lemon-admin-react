import { useEffect, useState } from 'react';
import { localStg } from '@/lib/storage';
import { ThemeProviderContext } from './hook';

export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

type Theme = StorageType.Local['themeMode'];

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: 'themeMode';
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'themeMode',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStg.getItem(storageKey)) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStg.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
