import { Button, Tooltip, type ButtonProps, type TooltipProps } from 'antd';
import SvgIcon from '../SvgIcon';
import type { CSSProperties, ReactNode } from 'react';

interface Props extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  /**
   * children
   * @descCN 子元素
   */
  children?: ReactNode;
  /**
   * Button class
   * @descCN 按钮类名
   */
  className?: string;
  /**
   * Iconify icon name
   * @descCN 图标名称
   */
  icon?: string;
  /**
   * local svg icon
   * @descCN 本地svg图标
   */
  localIcon?: string;
  /**
   * style
   * @descCN 样式
   */
  style?: CSSProperties;
  /**
   * Tooltip content
   * @descCN 提示内容
   */
  tooltipContent?: string;
  /**
   * Tooltip placement
   * @descCN 提示位置
   */
  tooltipPlacement?: TooltipProps['placement'];
  /**
   * Trigger tooltip on parent
   * @descCN 浮层渲染父节点
   */
  triggerParent?: boolean;
  /**
   * z-index
   * @descCN 层级
   */
  zIndex?: number;
}

// 动态计算class
const computeClass = (className: string) => {
  let classStr = className;

  if (!classStr.includes('h-')) {
    classStr += ' h-36px';
  }

  if (!classStr.includes('text-')) {
    classStr += ' text-icon';
  }

  return classStr;
};

const ButtonIcon = ({
  children,
  className = 'h-36 text-icon',
  icon,
  localIcon,
  style,
  tooltipContent,
  tooltipPlacement = 'bottom',
  triggerParent,
  zIndex = 98,
  ...props
}: Props) => {
  const cls = computeClass(className);

  // 获取浮层渲染父节点
  const getPopupContainer = (dom: HTMLElement) => {
    return triggerParent ? dom.parentElement! : document.body;
  };

  return (
    <Tooltip
      placement={tooltipPlacement}
      title={tooltipContent}
      zIndex={zIndex}
      getPopupContainer={getPopupContainer}
    >
      <Button type="text" className={cls} {...props}>
        <div className="flex-center gap-8">
          {children || <SvgIcon icon={icon} localIcon={localIcon} style={style} />}
        </div>
      </Button>
    </Tooltip>
  );
};

export default ButtonIcon;
