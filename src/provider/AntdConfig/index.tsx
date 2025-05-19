import { App, ConfigProvider, Watermark } from 'antd';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { antdLocales } from '@/locales/antd';
import { useThemeColorConfig, useThemeConfig } from '@/store/settingStore';
import { themeSettings } from '@/theme';
import { useLanguageContext } from '../LangProvider/utils';
import { useThemeContext } from '../Theme/utils';
import { getAntdTheme, setupThemeVarsToHtml } from './utils';
import type { WatermarkProps } from 'antd';
import '@ant-design/v5-patch-for-react-19'; // 引入antd v5 react19兼容包

// 水印配置，用于设置水印的样式
const WATERMARK_CONFIG: WatermarkProps = {
  font: {
    fontSize: 16,
  },
  height: 128,
  offset: [12, 60],
  rotate: -15,
  width: 240,
  zIndex: 9999,
};

const useAntdTheme = () => {
  const themeColors = useThemeColorConfig();
  const { watermarkVisible, watermarkText } = useThemeConfig();

  const { darkMode } = useThemeContext();

  const antdTheme = getAntdTheme(themeColors, darkMode, themeSettings.tokens);

  useEffect(() => {
    setupThemeVarsToHtml(themeColors, themeSettings.tokens);
  }, [themeColors]);

  return { antdTheme, watermarkVisible, watermarkText };
};

const AntdConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useLanguageContext();

  const { antdTheme, watermarkVisible, watermarkText } = useAntdTheme();

  return (
    <ConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      theme={antdTheme}
      locale={antdLocales[locale]}
    >
      <Watermark
        className="h-full"
        content={watermarkVisible ? watermarkText || 'GalaxyAdmin' : ''}
        {...WATERMARK_CONFIG}
      >
        <App className="h-full">{children}</App>
      </Watermark>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
