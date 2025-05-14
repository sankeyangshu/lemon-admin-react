import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeSettings } from '@/theme';
import { addPrefix } from '@/utils/storage';

/**
 * 主题设置类型
 */
interface themeConfigType {
  /**
   * Show setting
   * @descCN 显示设置
   */
  showSetting: boolean;
  /**
   * Theme layout mode
   * @descCN 主题布局模式
   */
  themeLayoutMode: UnionKey.ThemeLayoutMode;

  // TODO: 灰度、弱色、仅展开当前父级菜单、跟随主色功能未完成
  isGrey: boolean;
  isWeak: boolean;
  isOnlyExpandCurrentParentMenu: boolean;
  isInfoFollowPrimary: boolean;
}

/**
 * 主题设置key类型
 */
export type themeConfigKeyType = keyof themeConfigType;

/**
 * 系统设置store类型
 */
export interface settingsStoreType {
  /**
   * Theme config
   * @descCN 主题配置
   */
  themeConfig: themeConfigType;

  /**
   * Set theme config
   * @descCN 设置主题配置
   */
  setThemeConfig: (key: themeConfigKeyType, val: string | boolean) => void;

  /**
   * Theme color
   * @descCN 主题颜色
   */
  themeColor: App.Theme.ThemeColor;
  /**
   * Set theme color
   * @descCN 设置主题颜色
   */
  setThemeColor: (key: App.Theme.ThemeColorKey, val: string) => void;
}

export const useSettingStore = create<settingsStoreType>()(
  persist(
    (set, get) => ({
      themeConfig: {
        showSetting: false,
        themeLayoutMode: 'vertical',
        isGrey: false,
        isWeak: false,
        isOnlyExpandCurrentParentMenu: false,
        isInfoFollowPrimary: true,
      },

      setThemeConfig: (key: themeConfigKeyType, val: string | boolean) => {
        const { themeConfig } = get();

        set({
          themeConfig: {
            ...themeConfig,
            [key]: val,
          },
        });
      },

      themeColor: {
        primary: themeSettings.themeColor,
        ...themeSettings.otherColor,
      },

      setThemeColor: (key: App.Theme.ThemeColorKey, val: string) => {
        const { themeColor } = get();
        set({ themeColor: { ...themeColor, [key]: val } });
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
