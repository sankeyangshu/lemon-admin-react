/**
 * The global namespace for the app
 * @descCN 应用全局类型
 */
declare namespace App {
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
    interface LangOption {
      value: LangType;
      text: string;
    }

    /**
     * i18n scheme
     * @descCN i18n key
     */
    interface I18nScheme {
      system: {
        checkUrl: string;
        errorFallback: string;
        forbidden: string;
        goHome: string;
        loading: string;
        notFound: string;
        refreshAgain: string;
        serverError: string;
        title: string;
        updateCancel: string;
        updateConfirm: string;
        updateContent: string;
        updateTitle: string;
        themeMode: string;
        systemTheme: string;
        confirm: string;
        cancel: string;
        noMore: string;
      };
      api: {
        errMsg400: string;
        errMsg401: string;
        errMsg403: string;
        errMsg404: string;
        errMsg405: string;
        errMsg408: string;
        errMsg500: string;
        errMsg501: string;
        errMsg502: string;
        errMsg503: string;
        errMsg504: string;
        errMsg505: string;
        errMsgDefault: string;
        requestCancelled: string;
        networkError: string;
        requestConfigError: string;
      };
      theme: {
        header: {
          menuToggler: {
            expand: string;
            collapse: string;
          };
          fullScreen: {
            enter: string;
            exit: string;
          };
          globalSearch: {
            title: string;
            placeholder: string;
            history: string;
            selectKeyDown: string;
            switchKeyDown: string;
            exitKeyDown: string;
          };
          themeMode: string;
          locale: string;
          notice: {
            title: string;
            info: string;
            todo: string;
            not: string;
            all: string;
          };
          user: {
            userCenter: string;
            docs: string;
            github: string;
            lockScreen: string;
          };
        };
        drawer: {
          title: string;
          tabs: {
            appearance: string;
            layout: string;
            general: string;
          };
          appearance: {
            themeSchema: {
              title: string;
              light: string;
              dark: string;
              auto: string;
            };
            greyMode: string;
            weakMode: string;
            themeRadius: string;
          };
          layout: {
            layoutMode: {
              title: string;
            } & Record<App.Config.LayoutMode, string> & {
              [K in `${App.Config.LayoutMode}_detail`]: string;
            };
            tab: {
              title: string;
              visible: string;
              height: string;
              mode: { title: string } & Record<App.Config.TabMode, string>;
              closeByMiddleClick: string;
              closeByMiddleClickTip: string;
            };
            header: {
              title: string;
              height: string;
              breadcrumb: {
                visible: string;
                showIcon: string;
              };
            };
            sidebar: {
              title: string;
              inverted: string;
              width: string;
              collapsedWidth: string;
              mixWidth: string;
              mixCollapsedWidth: string;
              mixChildMenuWidth: string;
              autoSelectFirstMenu: string;
              autoSelectFirstMenuTip: string;
            };
            footer: {
              title: string;
              visible: string;
              fixed: string;
              height: string;
              right: string;
            };
            content: {
              title: string;
              scrollMode: {
                title: string;
                tip: string;
                wrapper: string;
                content: string;
              };
            };
          };
          footer: {
            copyConfig: string;
            resetConfig: string;
          };
        };
      };
      login: {
        title: string;
        subTitle: string;
        form: {
          userName: string;
          password: string;
        };
        placeholder: {
          username: string;
          password: string;
        };
        rememberPwd: string;
        forgetPwd: string;
        btnText: string;
        otherSignIn: string;
        noAccount: string;
        register: string;
        logout: string;
      };
    }

    type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    /**
     * I18n key
     */
    type I18nKey = GetI18nKey<I18nScheme>;
  }

  /**
   * The storage namespace
   * @descCN 存储命名空间
   */
  namespace Storage {
    /**
     * The local storage
     * @descCN 本地存储
     */
    interface Local {
      /**
       * The i18n language
       * @descCN 国际化语言
       */
      language: App.I18n.LangType;
      /**
       * The theme mode
       * @descCN 主题模式
       */
      themeMode: 'dark' | 'light' | 'system';
    }
  }

  /**
   * Config namespace
   * @descCN 全局配置命名空间
   */
  namespace Config {
    /**
     * Layout mode type
     * @descCN 布局模式类型
     * - vertical: 左侧菜单模式
     * - horizontal: 顶部菜单模式
     * - vertical-mix: 左侧菜单混合模式
     * - top-hybrid-sidebar-first: 顶部混合-侧边优先
     * - top-hybrid-header-first: 顶部混合-顶部优先
     */
    type LayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'vertical-hybrid-header-first' | 'top-hybrid-sidebar-first' | 'top-hybrid-header-first';

    /**
     * Tab mode type
     * @descCN 标签风格类型
     * - button: 按钮风格
     * - chrome: 谷歌风格
     * - slider: 滑块风格
     */
    type TabMode = 'button' | 'chrome' | 'slider';

    /**
     * System config
     * @descCN 系统配置
     */
    interface System {
      /**
       * Theme config
       * @descCN 主题配置
       */
      theme: {
        /**
         * Theme color
         * @descCN 主题颜色
         */
        color: string;
        /**
         * grey mode
         * @descCN 灰度模式
         * @default false
         */
        greyMode: boolean;
        /**
         * weak mode
         * @descCN 色弱模式
         * @default false
         */
        weakMode: boolean;
        /**
         * Theme radius
         * @descCN 圆角值
         * @default 6
         */
        radius: number;
      };

      /**
       * Layout config
       * @descCN 布局配置
       */
      layout: {
        /**
         * Theme layout mode
         * @descCN 主题布局模式
         * @default 'vertical'
         * @see {@link LayoutMode}
         */
        mode: LayoutMode;
        /**
         * Scroll mode
         * @descCN 滚动模式
         * @default 'content'
         */
        scrollMode: 'wrapper' | 'content';
      };

      /**
       * Header config
       * @descCN 头部配置
       */
      header: {
        /**
         * Header height
         * @descCN 头部高度
         * @default 56
         */
        height: number;
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
      };

      /**
       * Tab config
       * @descCN 标签页配置
       */
      tab: {
        /**
         * Tab visible
         * @descCN 显示标签
         * @default true
         */
        visible: boolean;
        /**
         * Tab height
         * @descCN 标签高度
         * @default 44
         */
        height: number;
        /**
         * The mode of the tab
         * @descCN 标签样式
         * @default 'chrome'
         * @see {@link TabMode}
         */
        mode: TabMode;
        /**
         * Close tab by middle click
         * @descCN 鼠标中键关闭标签页
         * @default false
         */
        closeTabByMiddleClick: boolean;
      };

      /**
       * Sidebar config
       * @descCN 侧边栏配置
       */
      sidebar: {
        /**
         * Sidebar inverted
         * @descCN 侧边栏反转色
         * @default false
         */
        inverted: boolean;
        /**
         * Sidebar width
         * @descCN 侧边栏宽度
         * @default 220
         */
        width: number;
        /**
         * Sidebar collapsed width
         * @descCN 侧边栏折叠宽度
         * @default 64
         */
        collapsedWidth: number;
        /**
         * Sidebar mix child menu width
         * @descCN 侧边栏混合子菜单宽度
         * @default 200
         */
        mixChildMenuWidth: number;
        /**
         * Sidebar mix collapsed width
         * @descCN 侧边栏混合折叠宽度
         * @default 64
         */
        mixCollapsedWidth: number;
        /**
         * Sidebar mix width
         * @descCN 侧边栏混合宽度
         * @default 90
         */
        mixWidth: number;
        /**
         * Sidebar auto select first menu
         * @descCN 侧边栏自动选择第一个子菜单
         * @default false
         */
        autoSelectFirstMenu: boolean;
      };

      /**
       * Footer config
       * @descCN 底部配置
       */
      footer: {
        /**
         * Footer visible
         * @descCN 底部显示
         * @default true
         */
        visible: boolean;
        /**
         * Footer height
         * @descCN 底部高度
         * @default 48
         */
        height: number;
        /**
         * Footer fixed
         * @descCN 底部固定
         * @default false
         */
        fixed: boolean;
        /**
         * Footer right
         * @descCN 底部居于右侧
         * @default true
         */
        right: boolean;
      };

      /**
       * Settings config
       * @descCN 设置配置
       */
      settings: {
        /**
         * Show theme drawer
         * @descCN 显示主题设置
         */
        showThemeDrawer: boolean;
        /**
         * Content x scrollable
         * @descCN 内容水平滚动
         */
        contentXScrollable: boolean;
        /**
         * Full content
         * @descCN 内容全屏
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
        /**
         * Fixed header and tab
         * @descCN 固定头部和标签栏
         * @default true
         */
        fixedHeaderAndTab: boolean;
      };
    }
  }

  /**
   * Global namespace
   */
  namespace Global {
    type RouteId = keyof import('@/routeTree.gen').FileRoutesById;
    type RoutePath = keyof import('@/routeTree.gen').FileRoutesByTo;

    /**
     * Menu
     * @descCN 菜单
     */
    interface Menu {
      /**
       * 菜单 key
       */
      key: string;
      /**
       * 菜单标题
       */
      title: string;
      /**
       * 路由 ID
       */
      routeId: RouteId;
      /**
       * 路由路径
       */
      routePath: RoutePath;
      /**
       * 国际化 key
       */
      i18nKey?: App.I18n.I18nKey;
      /**
       * 菜单图标
       */
      icon?: React.ReactNode;
      /**
       * 菜单标签
       */
      label?: string;
      /**
       * 菜单描述
       */
      caption?: string;
      /**
       * 排序值
       */
      order?: number;
      /**
       * 隐藏菜单
       */
      hideInMenu?: boolean;
      /**
       * 是否禁用
       */
      disabled?: boolean;
      /**
       * 子菜单
       */
      children?: Menu[];
    }

    /**
     * 路由静态数据
     */
    interface RouteStaticData extends Omit<Menu, 'key' | 'title' | 'routeId' | 'routePath' | 'children'> {
      /**
       * 路由标题
       */
      title?: string;
    }

    /**
     * Breadcrumb
     * @descCN 面包屑
     */
    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };
  }
}
