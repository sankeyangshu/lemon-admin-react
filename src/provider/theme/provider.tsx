import { useEffect, useState, useSyncExternalStore } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { localStg } from '@/lib/storage';
import { useAppStore } from '@/store/app';
import { DARK_MODE_MEDIA_QUERY, ThemeProviderContext } from './hook';
import { addThemeVarsToGlobal, ThemeColorsPresets } from './utils';

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

  // 订阅灰色、色弱模式和主题颜色
  const { greyMode, weakMode, themeColor } = useAppStore(useShallow((state) => ({
    greyMode: state.system.theme.greyMode,
    weakMode: state.system.theme.weakMode,
    themeColor: state.system.theme.color,
  })));

  const systemDark = useSyncExternalStore(subscribeMediaQuery, getMediaQuerySnapshot);
  const darkMode = theme === 'dark' || (theme === 'system' && systemDark);

  // 暗黑/明亮模式切换
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // 灰色和色弱模式
  useEffect(() => {
    const root = window.document.documentElement;

    root.style.filter = [
      greyMode ? 'grayscale(100%)' : '',
      weakMode ? 'invert(80%)' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [greyMode, weakMode]);

  // 添加主题颜色变量到全局
  useEffect(() => {
    addThemeVarsToGlobal(ThemeColorsPresets[themeColor]);
  }, [themeColor]);

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
