import viteCompression from 'vite-plugin-compression';
import type { PluginOption } from 'vite';

/**
 * Configures the compression plugin for Vite build process. (根据 compress 配置，生成不同的压缩规则)
 *
 * @param viteEnv - The Vite environment configuration containing compression settings.
 * @returns An array of Vite compression plugins based on the configured compression algorithms.
 * @see https://github.com/anncwb/vite-plugin-compression
 */
export function configCompressPlugin(viteEnv: ViteEnv): PluginOption | PluginOption[] {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    );
  }

  return plugins;
}
