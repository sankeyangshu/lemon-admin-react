import { theme as antdTheme } from 'antd';
import { themeSettings, themeVars } from '@/theme';
import { getRgb, transformColorWithOpacity } from '@/utils/color';
import { DARK_CLASS } from '../Theme/utils';
import { getColorPalette } from './antd';
import type { ConfigProviderProps } from 'antd';

/**
 * Get the antd theme
 * @descCN 获取antd主题
 * @param colors - The colors of the theme
 * @param darkMode - Whether the theme is dark
 * @param tokens - The tokens of the theme
 * @returns The antd theme
 */
export const getAntdTheme = (
  colors: App.Theme.ThemeColor,
  darkMode: boolean,
  tokens: App.Theme.ThemeSetting['tokens']
) => {
  // 获取antd主题
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;

  // 获取主题颜色
  const { error, info, primary, success, warning } = colors;

  // 获取背景颜色
  const bgColor = transformColorWithOpacity(
    primary,
    darkMode ? 0.3 : 0.1,
    darkMode ? '#000000' : '#ffffff'
  );

  // 获取容器背景颜色
  const containerBgColor = darkMode
    ? tokens.dark?.colors?.container
    : tokens.light?.colors.container;

  // 创建主题
  const theme: ConfigProviderProps['theme'] = {
    // TODO: 紧凑主题暂未实现
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    components: {
      Button: {
        controlHeightSM: 28,
      },
      Collapse: {
        contentPadding: '16px 16px 24px 16px',
        headerBg: containerBgColor,
      },
      Menu: {
        darkItemBg: 'transparent',
        darkSubMenuItemBg: 'transparent',
        itemMarginInline: 8,
        itemSelectedBg: bgColor,
        subMenuItemBg: 'transparent',
      },
      // MARK: 布局组件样式背景色可能后面需要修改，先看看效果
      Layout: {
        headerBg: containerBgColor,
        siderBg: containerBgColor,
      },
    },
    cssVar: true,
    token: {
      colorBgContainer: containerBgColor,
      colorError: error,
      colorInfo: info,
      colorPrimary: primary,
      colorSuccess: success,
      colorWarning: warning,
    },
  };

  return theme;
};

/**
 * Create theme palette colors
 * @descCN 创建主题颜色
 * @param colors - The colors of the theme
 * @returns The theme palette colors
 */
export const createThemePaletteColors = (colors: App.Theme.ThemeColor) => {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach((key) => {
    const colorMap = getColorPalette(colors[key]);

    colorPaletteVar[key] = colorMap.get(500)!;

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
};

/**
 * Create theme tokens
 * @descCN 创建主题token
 * @param colors - The colors of the theme
 * @param tokens - The tokens of the theme
 * @returns The theme tokens
 */
export const createThemeToken = (
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens']
) => {
  const paletteColors = createThemePaletteColors(colors);

  const { dark, light } = tokens || themeSettings.tokens;

  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    boxShadow: {
      ...light.boxShadow,
    },
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors,
    },
  };

  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow,
    },
    colors: {
      ...themeTokens.colors,
      ...dark?.colors,
    },
  };

  return {
    darkThemeTokens,
    themeTokens,
  };
};

/**
 * Get css var by tokens
 * @descCN 获取css变量
 * @param tokens - The tokens of the theme
 * @returns The css var
 */
const getCssVarByTokens = (tokens: App.Theme.BaseToken) => {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { b, g, r } = getRgb(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
};

/**
 * Add theme vars to global
 * @descCN 添加主题变量到全局
 * @param tokens - The tokens of the theme
 * @param darkTokens - The dark tokens of the theme
 */
export const addThemeVarsToGlobal = (
  tokens: App.Theme.BaseToken,
  darkTokens: App.Theme.BaseToken
) => {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
   :root {
      ${cssVarStr}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
};

/**
 * Setup theme vars to html
 * @descCN 设置主题变量到html
 * @param themeColors - The colors of the theme
 * @param tokens - The tokens of the theme
 */
export const setupThemeVarsToHtml = (
  themeColors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens']
) => {
  const { darkThemeTokens, themeTokens } = createThemeToken(themeColors, tokens);
  addThemeVarsToGlobal(themeTokens, darkThemeTokens);
};
