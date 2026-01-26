import { createContext, use } from 'react';
import { defaultLanguage } from '@/locales';

export const LOCALE_OPTIONS: App.I18n.LangOption[] = [
  {
    value: 'zh-CN',
    text: '简体中文',
  },
  {
    value: 'en-US',
    text: 'English',
  },
];

interface LocaleProviderState {
  locale: App.I18n.LangType;
  localeOptions: App.I18n.LangOption[];
  setLocale: (locale: App.I18n.LangType) => void;
}

const initialState: LocaleProviderState = {
  locale: defaultLanguage,
  localeOptions: LOCALE_OPTIONS,
  setLocale: () => null,
};

export const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

export function useLocale() {
  const context = use(LocaleProviderContext);

  if (context === undefined)
    throw new Error('useLocale must be used within a LocaleProvider');

  return context;
}
