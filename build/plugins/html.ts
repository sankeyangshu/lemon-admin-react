import type { Plugin } from 'vite';

/**
 * Configures the html plugin for Vite.
 * @descCN 配置html vite 插件
 * @param lastBuildTime - The last build time. 最后编译时间
 * @returns The configured html plugin.
 */
export function setupHtmlPluginConfig(lastBuildTime: string) {
  const plugin: Plugin = {
    name: 'vite-plugin-html',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${lastBuildTime}">`);
    },
  };

  return plugin;
}
