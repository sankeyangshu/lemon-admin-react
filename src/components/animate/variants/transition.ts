import type { TranEnterType, TranExitType, TranHoverType } from '@/types/animate';

/**
 * 过渡动画 hover
 * @param props 过渡动画 hover 类型
 */
export const varTranHover = (props?: TranHoverType) => {
  const duration = props?.duration || 0.32;
  const ease = props?.ease || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

/**
 * 过渡动画 enter
 * @param props 过渡动画 enter 类型
 */
export const varTranEnter = (props?: TranEnterType) => {
  const duration = props?.durationIn || 0.64;
  const ease = props?.easeIn || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

/**
 * 过渡动画 exit
 * @param props 过渡动画 exit 类型
 */
export const varTranExit = (props?: TranExitType) => {
  const duration = props?.durationOut || 0.48;
  const ease = props?.easeOut || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};
