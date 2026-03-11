import { useEffect, useState, useSyncExternalStore } from 'react';
import { localStg } from '@/lib/storage';
import { useAppStore } from '@/store/app';
import { ThemeProviderContext } from './hook';

export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

type Theme = App.Storage.Local['themeMode'];

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: 'themeMode';
}

const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

function subscribeMediaQuery(callback: () => void) {
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getMediaQuerySnapshot() {
  return mediaQuery.matches;
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

  // 订阅灰色和色弱模式
  const greyMode = useAppStore((state) => state.system.theme.greyMode);
  const weakMode = useAppStore((state) => state.system.theme.weakMode);

  const systemDark = useSyncExternalStore(subscribeMediaQuery, getMediaQuerySnapshot);
  const darkMode = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.style.filter = [
      greyMode ? 'grayscale(100%)' : '',
      weakMode ? 'invert(80%)' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [greyMode, weakMode]);

  const value = {
    theme,
    darkMode,
    setTheme: (newTheme: Theme) => {
      localStg.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
