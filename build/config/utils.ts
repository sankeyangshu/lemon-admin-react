import path from 'node:path';
import process from 'node:process';

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdFn(mode: string): boolean {
  return mode === 'production';
}

export function isTestFn(mode: string): boolean {
  return mode === 'test';
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.VITE_REPORT === 'true';
}

/**
 * Read all environment variable configuration files to process.env (读取并处理所有环境变量配置文件 .env)
 *
 * @param envConf - A record of environment variables to be processed.
 * @returns An object containing the processed environment variables with appropriate types.
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    // 去除空格
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
        // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
      } catch (error) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
