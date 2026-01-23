import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * merge classnames
 * @descCN 合并 classnames
 * @param inputs - classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
