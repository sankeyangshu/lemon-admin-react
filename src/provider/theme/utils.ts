/**
 * Add theme vars to global
 * @descCN 添加主题变量到全局
 * @param tokens 主题 token
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken) {
  const { light, default: defaultColor, dark } = tokens;

  const css = `
    :root {
      --primary: ${defaultColor};
      --primary-foreground: ${light};
      --ring: ${defaultColor};
      --sidebar-primary: ${defaultColor};
      --sidebar-primary-foreground: ${light};
      --sidebar-ring: ${defaultColor};
    }
  `;

  const darkCss = `
    .dark {
      --primary-foreground: ${dark};
      --sidebar-primary-foreground: ${dark};
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}
