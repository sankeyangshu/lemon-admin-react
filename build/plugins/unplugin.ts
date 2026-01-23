import type { PluginOption } from 'vite';
import path from 'node:path';
import process from 'node:process';
import createSvgIconsPlugin from 'unplugin-svg-component/vite';

/**
 * Configures the unplugin-svg-component plugin for Vite.
 * @descCN 配置unplugin-svg-component vite 插件
 * @param viteEnv - The Vite environment configuration containing compression settings.
 * @see {@link https://github.com/Jevon617/unplugin-svg-component}
 */
export function setupUnPluginSvgIconConfig(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX } = viteEnv;

  const plugins: PluginOption = createSvgIconsPlugin({
    projectType: 'react',
    iconDir: path.join(process.cwd(), 'src/assets/svg-icon'),
    dts: true,
    dtsDir: path.join(process.cwd(), 'src/types'),
    prefix: VITE_ICON_PREFIX,
    componentName: 'LocalSvgIcon',
    treeShaking: false,
    preserveColor: /.*\.svg$/, // 保留多色图标的原始颜色
    symbolIdFormatter: (svgName: string, prefix: string): string => {
      const nameArr = svgName.split('/');
      if (prefix)
        nameArr.unshift(prefix);
      return nameArr.join('-').replace(/\.svg$/, '');
    },
  });

  return plugins;
}
