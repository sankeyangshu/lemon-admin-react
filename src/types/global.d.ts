export {};

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  /* Vite */
  type Recordable<T = any> = Record<string, T>;

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  interface ViteEnv {
    VITE_NODE_ENV: 'development' | 'production' | 'test';
    VITE_APP_TITLE: string;
    VITE_APP_HOMEPAGE: string;
    VITE_PORT: number;
    VITE_STORAGE_PREFIX: string;
    VITE_USE_MOCK: boolean;
    VITE_OPEN: boolean;
    VITE_REPORT: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_APP_BASE_API: string;
    VITE_APP_IMG_URL: string;
    VITE_PROXY: [string, string][];
    VITE_USE_IMAGEMIN: boolean;
  }
}
