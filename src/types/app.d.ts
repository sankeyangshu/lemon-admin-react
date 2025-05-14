/**
 * The global namespace for the app
 * @descCN 应用全局类型
 */
declare namespace App {
  // TODO： 此处类型需要大改
  /**
   * Theme namespace
   * @descCN 主题命名空间
   */
  namespace Theme {
    /**
     * Other color - (error, info, success, warning)
     * @descCN 其他颜色
     */
    interface OtherColor {
      error: string;
      info: string;
      success: string;
      warning: string;
    }

    /**
     * Theme color
     * @descCN 主题颜色
     */
    interface ThemeColor extends OtherColor {
      primary: string;
    }

    /**
     * Theme color type key
     * @descCN 主题颜色类型key
     */
    type ThemeColorKey = keyof ThemeColor;

    /**
     * Color palette number
     * @descCN 颜色透明度
     */
    type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

    /**
     * Theme palette color
     * @descCN 主题颜色不同透明度类型
     */
    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    /**
     * Theme setting token color
     * @descCN 主题设置样式颜色
     */
    interface ThemeSettingTokenColor {
      'base-text': string;
      'base-border': string;
      container: string;
      inverted: string;
      layout: string;
      nprogress?: string;
    }

    /**
     * Theme setting token box shadow
     * @descCN 主题设置样式阴影
     */
    interface ThemeSettingTokenBoxShadow {
      card: string;
    }

    /**
     * Theme setting token
     * @descCN 主题设置样式
     */
    interface ThemeSettingToken {
      boxShadow: ThemeSettingTokenBoxShadow;
      colors: ThemeSettingTokenColor;
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor;

    /**
     * Theme token CSS variables
     * @descCN 主题样式 CSS变量
     */
    type ThemeTokenCSSVars = {
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string };
      colors: ThemeTokenColor & { [key: string]: string };
    };

    // TODO: 不知道有没有用，后面可能去除
    type BaseToken = Record<string, Record<string, string>>;

    /**
     * Theme setting
     * @descCN 主题设置
     */
    interface ThemeSetting {
      /**
       * Other color
       * @descCN 其他颜色
       */
      otherColor: OtherColor;
      /**
       * Theme color
       * @descCN 主题颜色
       */
      themeColor: string;
      /**
       * Define some theme settings tokens, will transform to css variables
       * @descCN 定义一些主题设置的tokens，转换为CSS变量
       */
      tokens: {
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        };
        light: ThemeSettingToken;
      };
    }
  }

  /**
   * I18n namespace
   * @descCN 国际化命名空间
   */
  namespace I18n {
    /**
     * Language type
     * @descCN 语言类型
     */
    type LangType = 'en-US' | 'zh-CN';

    /**
     * Language option
     * @descCN 语言选项
     */
    type LangOption = {
      key: LangType;
      label: string;
    };
  }
}
