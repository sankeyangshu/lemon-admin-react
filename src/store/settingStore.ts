import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeSettings } from '@/theme';
import { addPrefix } from '@/utils/storage';

/**
 * 系统设置store类型
 */
export interface settingsStoreType {
  /**
   * Theme config
   * @descCN 主题配置
   */
  themeConfig: App.Theme.ThemeConfig;

  /**
   * Set theme config
   * @descCN 设置主题配置
   */
  setThemeConfig: (key: App.Theme.ThemeConfigKey, val: string | boolean) => void;

  /**
   * Theme color
   * @descCN 主题颜色
   */
  themeColor: App.Theme.ThemeColor;

  /**
   * Custom info color
   * @descCN 自定义信息色
   */
  customInfoColor: string;

  /**
   * Set theme color
   * @descCN 设置主题颜色
   */
  setThemeColor: (key: App.Theme.ThemeColorKey, val: string) => void;

  /**
   * System config
   * @descCN 系统配置
   */
  systemConfig: App.Theme.SystemConfig;

  /**
   * Set system config
   * @descCN 设置系统配置
   */
  setSystemConfig: (key: App.Theme.SystemConfigKey, val: boolean) => void;
}

export const useSettingStore = create<settingsStoreType>()(
  persist(
    (set, get) => ({
      themeConfig: {
        themeLayoutMode: 'vertical',
        fixedHeaderAndTab: true,
        scrollMode: 'content',
        headerHeight: 56,
        breadcrumbVisible: true,
        breadcrumbShowIcon: true,
        tabVisible: true,
        tabHeight: 44,
        tabCache: true,
        tabMode: 'chrome',
        sidebarWidth: 220,
        sidebarCollapsedWidth: 64,
        sidebarInverted: false,
        sidebarMixChildMenuWidth: 200,
        sidebarMixCollapsedWidth: 64,
        sidebarMixWidth: 90,
        footerVisible: true,
        footerHeight: 48,
        footerFixed: false,
        footerRight: true,
        isGrey: false,
        isWeak: false,
        isInfoFollowPrimary: true,
      },

      customInfoColor: themeSettings.otherColor.info,

      setThemeConfig: (key: App.Theme.ThemeConfigKey, val: string | boolean) => {
        const { themeConfig, themeColor, customInfoColor } = get();

        set({
          themeConfig: {
            ...themeConfig,
            [key]: val,
          },
        });

        // 当 isInfoFollowPrimary 设置变化时，更新信息色
        if (key === 'isInfoFollowPrimary') {
          const newThemeColor = { ...themeColor };
          if (val) {
            // 如果开启了信息色跟随主色，则将信息色设置为主色
            newThemeColor.info = themeColor.primary;
          } else {
            // 如果关闭了信息色跟随主色，则恢复自定义的信息色
            newThemeColor.info = customInfoColor;
          }
          set({ themeColor: newThemeColor });
        }
      },

      themeColor: {
        primary: themeSettings.themeColor,
        ...themeSettings.otherColor,
      },

      setThemeColor: (key: App.Theme.ThemeColorKey, val: string) => {
        const { themeColor, themeConfig } = get();
        const newThemeColor = { ...themeColor, [key]: val };

        // 如果设置的是信息色，且当前没有开启跟随主色，则保存为自定义信息色
        if (key === 'info' && !themeConfig.isInfoFollowPrimary) {
          set({ customInfoColor: val });
        }

        // 如果更新的是主色，并且信息色跟随主色，则同时更新信息色
        if (key === 'primary' && themeConfig.isInfoFollowPrimary) {
          newThemeColor.info = val;
        }

        set({ themeColor: newThemeColor });
      },

      systemConfig: {
        showSetting: false,
        isMobile: false,
        contentXScrollable: true,
        fullContent: false,
        mixSidebarFixed: false,
        reloadFlag: false,
        sidebarCollapse: false,
      },

      setSystemConfig: (key: App.Theme.SystemConfigKey, val: boolean) => {
        const { systemConfig } = get();
        set({ systemConfig: { ...systemConfig, [key]: val } });
      },
    }),
    {
      // 进行持久化存储
      name: addPrefix('settingStorage'), // 本地存储的名称
    }
  )
);

/**
 * use theme config store hook
 * @descCN 使用主题配置 store hook
 */
export const useThemeConfig = () => useSettingStore((state) => state.themeConfig);

/**
 * use theme color config store hook
 * @descCN 使用主题颜色配置 store hook
 */
export const useThemeColorConfig = () => useSettingStore((state) => state.themeColor);

/**
 * use system config store hook
 * @descCN 使用系统配置 store hook
 */
export const useSystemConfig = () => useSettingStore((state) => state.systemConfig);
