import { Icon as IconifyIcon, type IconifyIcon as IconType } from '@iconify/react';
import type { CSSProperties } from 'react';

interface IconPropsType {
  /**
   * 图标名称
   */
  icon?: string | IconType;
  /**
   * 本地svg图标
   */
  localIcon?: string;
  /**
   * 图标的类名
   */
  className?: string;
  /**
   * 图标大小
   */
  size?: string | number;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标样式
   */
  style?: CSSProperties;
}

const defaultLocalIcon = 'logo';

const symbolId = (localIcon: string = defaultLocalIcon) => {
  const iconName = localIcon || defaultLocalIcon;

  return `#icon-${iconName}`;
};

const Icon = ({
  icon,
  localIcon,
  size = '1em',
  color = 'currentColor',
  className = '',
  style = {},
}: IconPropsType) => {
  // If localIcon is passed, render localIcon first
  return localIcon || !icon ? (
    <svg aria-hidden="true" height={size} width={size} className={className}>
      <use fill="currentColor" href={symbolId(localIcon)} />
    </svg>
  ) : (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      className={className}
      style={{ color, height: size, width: size, ...style }}
    />
  );
};

export default Icon;
