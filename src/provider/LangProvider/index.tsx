import { useState, type FC, type PropsWithChildren } from 'react';
import { defaultLanguage, i18n } from '@/locales';
import { setItem } from '@/utils/storage';
import { LangContext } from './utils';

const localeOptions: App.I18n.LangOption[] = [
  {
    key: 'zh-CN',
    label: '中文',
  },
  {
    key: 'en-US',
    label: 'English',
  },
];

const LangProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<App.I18n.LangType>(defaultLanguage);

  const changeLocale = (lang: App.I18n.LangType) => {
    i18n.changeLanguage(lang);

    setLocale(lang);

    setItem('language', lang);
  };

  return (
    <LangContext value={{ locale, localeOptions, setLocale: changeLocale }}>{children}</LangContext>
  );
};

export default LangProvider;
