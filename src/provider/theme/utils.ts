/**
 * Theme colors presets
 * @descCN 主题颜色预设
 */
export const ThemeColorsPresets: Record<App.Config.ThemeColor, string> = {
  teal: '#009688',
  beige: '#daa96e',
  oceanBlue: '#0c819f',
  emeraldGreen: '#27ae60',
  hotPink: '#ff5c93',
  coralRed: '#e74c3c',
  salmonPink: '#fd726d',
  orange: '#f39c12',
  violet: '#9b59b6',
};

/**
 * Add theme vars to global
 * @descCN 添加主题变量到全局
 */
export function addThemeVarsToGlobal(color: string) {
  const css = `
    :root {
      --primary: ${color};
      --ring: ${color};
      --sidebar-primary: ${color};
      --sidebar-ring: ${color};
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css;

  document.head.appendChild(style);
}
