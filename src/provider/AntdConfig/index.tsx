import { App, ConfigProvider } from 'antd';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { antdLocales } from '@/locales/antd';
import { useThemeColorConfig } from '@/store/settingStore';
import { themeSettings } from '@/theme';
import { useLanguageContext } from '../LangProvider/utils';
import { useThemeContext } from '../Theme/utils';
import { getAntdTheme, setupThemeVarsToHtml } from './utils';
import '@ant-design/v5-patch-for-react-19'; // 引入antd v5 react19兼容包

const useAntdTheme = () => {
  const themeColors = useThemeColorConfig();

  const { darkMode } = useThemeContext();

  const antdTheme = getAntdTheme(themeColors, darkMode, themeSettings.tokens);

  useEffect(() => {
    setupThemeVarsToHtml(themeColors, themeSettings.tokens);
  }, [themeColors]);

  return { antdTheme };
};

const AntdConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useLanguageContext();

  const { antdTheme } = useAntdTheme();

  return (
    <ConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      theme={antdTheme}
      locale={antdLocales[locale]}
    >
      {/* TODO: 水印功能暂时不写 */}
      <App className="h-full">{children}</App>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
