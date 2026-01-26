/**
 * The storage type
 * @descCN 存储类型
 */
type StorageType = 'local' | 'session';

/**
 * create storage
 * @descCN 创建storage
 * @param type storage type local or session
 * @param storagePrefix storage prefix
 * @returns storage
 */
function createStorage<T extends object>(type: StorageType, storagePrefix: string) {
  const stg = type === 'session' ? window.sessionStorage : window.localStorage;

  const storage = {
    /**
     * get item from localStorage
     * @descCN 从localStorage获取item
     * @param key key
     * @returns item
     */
    getItem<K extends keyof T>(key: K): T[K] | null {
      const result = stg.getItem(`${storagePrefix}${key as string}`);

      if (result !== null) {
        let value: T[K] | null = null;

        try {
          value = JSON.parse(result) as T[K];
        } catch {}

        if (value) {
          return value;
        }
      }

      stg.removeItem(`${storagePrefix}${key as string}`);

      return null;
    },
    /**
     * get item key
     * @descCN 获取item key
     * @param key key
     * @returns item key
     */
    getItemKey<K extends keyof T>(key: K) {
      return `${storagePrefix}${key as string}`;
    },
    /**
     * set item to localStorage
     * @descCN 设置item到localStorage
     * @param key key
     * @param value value
     */
    setItem<K extends keyof T>(key: K, value: T[K]) {
      stg.setItem(`${storagePrefix}${key as string}`, JSON.stringify(value));
    },
    /**
     * remove item from localStorage
     * @descCN 从localStorage移除item
     * @param key key
     */
    removeItem(key: keyof T) {
      stg.removeItem(`${storagePrefix}${key as string}`);
    },
    /**
     * clear all items from localStorage
     * @descCN 清除localStorage所有item
     */
    clear() {
      stg.clear();
    },
  };

  return storage;
}

/**
 * The local storage
 * @descCN 本地存储
 */
export const localStg = createStorage<StorageType.Local>('local', import.meta.env.VITE_STORAGE_PREFIX ?? '');
