import { useState } from 'react';
import { localStg } from '@/lib/storage';
import { defaultLanguage, i18n } from '@/locales';
import { LOCALE_OPTIONS, LocaleProviderContext } from './hook';

export interface LocaleProviderProps {
  children: React.ReactNode;
  defaultLocale?: App.I18n.LangType;
  storageKey?: 'language';
}

export function LocaleProvider({
  children,
  defaultLocale = defaultLanguage,
  storageKey = 'language',
  ...props
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<App.I18n.LangType>(
    () => (localStg.getItem(storageKey)) || defaultLocale,
  );

  const value = {
    locale,
    localeOptions: LOCALE_OPTIONS,
    setLocale: (lang: App.I18n.LangType) => {
      void i18n.changeLanguage(lang);
      localStg.setItem(storageKey, lang);
      setLocale(lang);
    },
  };

  return (
    <LocaleProviderContext {...props} value={value}>
      {children}
    </LocaleProviderContext>
  );
}
