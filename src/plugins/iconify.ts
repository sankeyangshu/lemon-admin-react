import { addAPIProvider } from '@iconify/react';

/**
 * Setup the iconify offline mode
 * @descCN 设置 iconify 离线模式
 */
export function setupIconifyOffline() {
  const { VITE_ICONIFY_URL } = import.meta.env;

  if (VITE_ICONIFY_URL !== undefined) {
    addAPIProvider('', { resources: [VITE_ICONIFY_URL] });
  }
}
