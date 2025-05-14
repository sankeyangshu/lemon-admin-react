/**
 * Create color palette variables
 * @descCN 创建颜色变量
 */
const createColorPaletteVars = () => {
  // 颜色列表
  const colorList: App.Theme.ThemeColorKey[] = ['primary', 'info', 'success', 'warning', 'error'];

  // 颜色亮度列表
  const colorPaletteNumberList: App.Theme.ColorPaletteNumber[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorList.forEach((color) => {
    colorPaletteVar[color] = `rgb(var(--${color}-color))`;

    colorPaletteNumberList.forEach((number) => {
      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`;
    });
  });

  return colorPaletteVar;
};

const colorPaletteVars = createColorPaletteVars();

/**
 * UnoCSS Theme vars
 * @descCN UnoCSS 主题变量
 */
export const themeVars: App.Theme.ThemeTokenCSSVars = {
  boxShadow: {
    card: 'var(--card-box-shadow)',
  },
  colors: {
    ...colorPaletteVars,
    'base-text': 'rgb(var(--base-text-color))',
    'base-border': 'rgb(var(--base-border-color))',
    container: 'rgb(var(--container-bg-color))',
    inverted: 'rgb(var(--inverted-bg-color))',
    layout: 'rgb(var(--layout-bg-color))',
    nprogress: 'rgb(var(--nprogress-color))',
  },
};
