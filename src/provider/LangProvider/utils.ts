import { createContext, useContext } from 'react';
import { defaultLanguage } from '@/locales';

export type LangContextType = {
  locale: App.I18n.LangType;
  localeOptions: App.I18n.LangOption[];
  setLocale: (locale: App.I18n.LangType) => void;
};

export const LangContext = createContext<LangContextType>({
  locale: defaultLanguage,
  localeOptions: [
    {
      key: 'zh-CN',
      label: '中文',
    },
    {
      key: 'en-US',
      label: 'English',
    },
  ],
  setLocale: () => {},
});

/**
 * use Language Context
 * @descCN 使用语言 hook
 */
export const useLanguageContext = () => {
  const language = useContext(LangContext);

  if (!language) {
    throw new Error('useLanguageContext must be used within a LangProvider');
  }

  return language;
};
