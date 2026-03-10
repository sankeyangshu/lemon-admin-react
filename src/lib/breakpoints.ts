/**
 * 断点
 */
export const BREAKPOINTS_TOKEN = {
  'xs': '375px', // mobile => @media (min-width: 0px) { ... }
  'sm': '640px', // mobile => @media (min-width: 640px) { ... }
  'md': '768px', // tablet => @media (min-width: 768px) { ... }
  'lg': '1024px', // desktop => @media (min-width: 1024px) { ... }
  'xl': '1280px', // desktop-lg => @media (min-width: 1280px) { ... }
  '2xl': '1536px', // desktop-xl => @media (min-width: 1536px) { ... }
} as const;

type BreakpointsKeys = keyof typeof BREAKPOINTS_TOKEN;

const PX_REGEXP = /px$/i;

/**
 * 移除 px 单位并转换为数字
 * @param value - 值，例如："16px", "16.5px", "-16px", "16", 16
 * @returns 转换后的数字，例如：16, 16.5, -16, 16, 16
 */
export function removePx(value: string | number) {
  // 如果已经是数字，直接返回
  if (typeof value === 'number')
    return value;

  // 如果是空字符串，抛出错误
  if (!value) {
    throw new Error('Invalid value: empty string');
  }

  // 移除所有空格
  const trimmed = value.trim();

  // 检查是否以 px 结尾（不区分大小写）
  const hasPx = PX_REGEXP.test(trimmed);

  // 提取数字部分
  const num = hasPx ? trimmed.slice(0, -2) : trimmed;

  // 转换为数字
  const result = Number.parseFloat(num);

  // 验证结果是否为有效数字
  if (Number.isNaN(result)) {
    throw new TypeError(`Invalid value: ${value}`);
  }

  return result;
}

/**
 * 向上断点
 * @param key - 断点键
 */
export function up(key: BreakpointsKeys) {
  return `(min-width: ${removePx(BREAKPOINTS_TOKEN[key])}px)`;
}

/**
 * 向下断点
 * @param key - 断点键
 */
export function down(key: BreakpointsKeys) {
  // 减去0.05px避免断点重叠
  return `(max-width: ${removePx(BREAKPOINTS_TOKEN[key]) - 0.05}px)`;
}

/**
 * 在两个断点之间
 * @param start - 开始断点键
 * @param end - 结束断点键
 */
export function between(start: BreakpointsKeys, end: BreakpointsKeys) {
  return `(min-width: ${removePx(BREAKPOINTS_TOKEN[start])}px) and (max-width: ${removePx(BREAKPOINTS_TOKEN[end]) - 0.05}px)`;
}
