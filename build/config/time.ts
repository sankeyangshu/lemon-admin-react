import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

/**
 * Get the last build time.
 * @descCN 获取最后编译时间
 * @returns The last build time.
 */
export function getLastBuildTime() {
  const now = new TZDate(Date.now(), 'Asia/Shanghai');
  const buildTime = format(now, 'yyyy-MM-dd HH:mm:ss');

  return buildTime;
}
