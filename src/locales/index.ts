import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { localStg } from '@/lib/storage';
import localeResources from './locale';

/**
 * 默认使用的语言
 */
export const defaultLanguage = localStg.getItem('language') || 'zh-CN';

/**
 * Setup plugin i18n
 * @descCN 设置国际化
 */
export async function setupI18n() {
  // 初始化时设置HTML lang属性，否则系统语言和设定不同时会弹出浏览器的翻译提示
  document.documentElement.lang = defaultLanguage;

  // 创建i18n实例
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: localeResources,
      lng: defaultLanguage,
      fallbackLng: 'zh-CN',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'], // 检测顺序
        caches: ['localStorage'], // 缓存到 localStorage
        lookupLocalStorage: localStg.getItemKey('language'), // LocalStorage 键名
      },
    });
}

export { i18n };
