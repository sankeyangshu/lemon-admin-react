/**
 * Theme setting
 * @descCN 主题设置
 */
export const themeSettings: App.Theme.ThemeSetting = {
  otherColor: {
    error: '#ff4d4f',
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
  },
  themeColor: '#16a085',
  tokens: {
    dark: {
      colors: {
        'base-text': 'rgb(217, 217, 217)',
        'base-border': 'rgb(65, 66, 67)',
        container: 'rgb(31, 31, 31)',
        layout: 'rgb(20, 20, 20)',
      },
    },
    light: {
      boxShadow: {
        card: '0 0 12px rgb(0, 21, 41, 0.08)',
      },
      colors: {
        'base-text': 'rgb(31, 31, 31)',
        'base-border': 'rgb(246, 246, 246)',
        container: 'rgb(255, 255, 255)',
        inverted: 'rgb(0, 22, 40)',
        layout: 'rgb(240, 242, 245)',
      },
    },
  },
};

export { themeVars } from './utils';
