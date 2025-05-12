import { useMount, useTheme } from 'ahooks';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { addPrefix, setItem } from '@/utils/storage';
import { DARK_MODE_MEDIA_QUERY, ThemeContext, toggleCssDarkMode } from './utils';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { themeMode, setThemeMode } = useTheme({
    localStorageKey: addPrefix('themeMode'),
  });

  const darkMode = themeMode === 'dark';

  useEffect(() => {
    toggleCssDarkMode(darkMode);
    setItem('darkMode', darkMode);
  }, [darkMode]);

  useMount(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

    const handler = (event: MediaQueryListEvent) => {
      if (themeMode !== 'system') return;
      setThemeMode(event.matches ? 'dark' : 'light');
    };

    return () => {
      // 在组件卸载时清理监听器
      mediaQuery.removeEventListener('change', handler);
    };
  });

  return (
    <ThemeContext
      value={{
        darkMode,
        themeScheme: themeMode,
        setThemeScheme: setThemeMode,
      }}
    >
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
