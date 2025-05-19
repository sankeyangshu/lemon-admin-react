const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || '';

/**
 * add prefix to key
 * @descCN 添加前缀到key
 * @param key key
 * @returns key with prefix
 */
export const addPrefix = (key: string) => `${storagePrefix}${key}`;

/**
 * get item from localStorage
 * @descCN 从localStorage获取item
 * @param key key
 * @returns item
 */
export const getItem = <T>(key: string): T | null => {
  let value = null;
  try {
    const result = window.localStorage.getItem(addPrefix(key));
    if (result) {
      try {
        value = JSON.parse(result);
      } catch {
        // if parse json failed, return the original string
        value = result as unknown as T;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

/**
 * get string item from localStorage
 * @descCN 从localStorage获取字符串item
 * @param key key
 * @returns string item
 */
export const getStringItem = (key: string): string | null => {
  return localStorage.getItem(addPrefix(key));
};

/**
 * set item to localStorage
 * @descCN 设置item到localStorage
 * @param key key
 * @param value value
 */
export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(addPrefix(key), JSON.stringify(value));
};

/**
 * remove item from localStorage
 * @descCN 从localStorage移除item
 * @param key key
 */
export const removeItem = (key: string): void => {
  localStorage.removeItem(addPrefix(key));
};

/**
 * clear all items from localStorage
 * @descCN 清除localStorage所有item
 */
export const clearItems = () => {
  localStorage.clear();
};
