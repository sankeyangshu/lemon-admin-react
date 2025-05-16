/**
 * The global namespace for the app
 * @descCN 应用全局类型
 */
declare namespace App {
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

    /**
     * Theme config
     * @descCN 主题配置
     */
    interface ThemeConfig {
      /**
       * Theme layout mode
       * @descCN 主题布局模式
       * @default 'vertical'
       */
      themeLayoutMode: UnionKey.ThemeLayoutMode;
      /**
       * Fixed header and tab
       * @descCN 固定头部和标签栏
       * @default true
       */
      fixedHeaderAndTab: boolean;
      /**
       * Scroll mode
       * @descCN 滚动模式
       * @default 'content'
       */
      scrollMode: UnionKey.LayoutScrollMode;
      /**
       * Header height
       * @descCN 头部高度
       * @default 56
       */
      headerHeight: number;
      /**
       * Breadcrumb visible
       * @descCN 显示面包屑
       * @default true
       */
      breadcrumbVisible: boolean;
      /**
       * Breadcrumb show icon
       * @descCN 显示面包屑图标
       * @default true
       */
      breadcrumbShowIcon: boolean;
      /**
       * Tab visible
       * @descCN 显示标签
       * @default true
       */
      tabVisible: boolean;
      /**
       * Tab height
       * @descCN 标签高度
       * @default 44
       */
      tabHeight: number;
      /**
       * Tab cache
       * @descCN 标签缓存
       * @default true
       */
      tabCache: boolean;
      /**
       * TODO: 可能去除，暂时保留
       * Tab mode
       * @descCN 标签模式
       * @default 'chrome'
       */
      tabMode: 'chrome' | 'card';

      /**
       * Sidebar width
       * @descCN 侧边栏宽度
       * @default 220
       */
      sidebarWidth: number;
      /**
       * Sidebar collapsed width
       * @descCN 侧边栏折叠宽度
       * @default 64
       */
      sidebarCollapsedWidth: number;
      /**
       * Sidebar inverted
       * @descCN 侧边栏反转色
       * @default false
       */
      sidebarInverted: boolean;
      /**
       * Sidebar mix child menu width
       * @descCN 侧边栏混合子菜单宽度
       * @default 200
       */
      sidebarMixChildMenuWidth: number;
      /**
       * Sidebar mix collapsed width
       * @descCN 侧边栏混合折叠宽度
       * @default 64
       */
      sidebarMixCollapsedWidth: number;
      /**
       * Sidebar mix width
       * @descCN 侧边栏混合宽度
       * @default 90
       */
      sidebarMixWidth: number;

      /**
       * Footer visible
       * @descCN 底部显示
       * @default true
       */
      footerVisible: boolean;
      /**
       * Footer height
       * @descCN 底部高度
       * @default 48
       */
      footerHeight: number;
      /**
       * Footer fixed
       * @descCN 底部固定
       * @default false
       */
      footerFixed: boolean;
      /**
       * Footer right
       * @descCN 底部居于右侧
       * @default true
       */
      footerRight: boolean;

      /**
       * grey mode
       * @descCN 灰度模式
       * @default false
       */
      isGrey: boolean;
      /**
       * weak mode
       * @descCN 色弱模式
       * @default false
       */
      isWeak: boolean;
      /**
       * info follow primary
       * @descCN 信息色跟随主色
       * @default true
       */
      isInfoFollowPrimary: boolean;
    }

    /**
     * Theme config key type
     * @descCN 主题配置key类型
     */
    type ThemeConfigKey = keyof ThemeConfig;

    /**
     * System config
     * @descCN 系统配置
     */
    interface SystemConfig {
      /**
       * Show setting
       * @descCN 显示设置
       */
      showSetting: boolean;
      /**
       * Is mobile layout
       * @descCN 是否移动端布局
       */
      isMobile: boolean;
      /**
       * Content x scrollable
       * @descCN 内容x轴滚动
       */
      contentXScrollable: boolean;
      /**
       * Full content
       * @descCN 全屏内容
       */
      fullContent: boolean;
      /**
       * Mix sidebar fixed
       * @descCN 混合侧边栏固定
       */
      mixSidebarFixed: boolean;
      /**
       * Reload flag
       * @descCN 重新加载标志
       */
      reloadFlag: boolean;
      /**
       * Sidebar collapse
       * @descCN 侧边栏折叠
       */
      sidebarCollapse: boolean;
    }

    /**
     * System config key type
     * @descCN 系统配置key类型
     */
    type SystemConfigKey = keyof SystemConfig;
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
