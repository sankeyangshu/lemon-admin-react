/**
 * 容器动画变量类型
 */
export type Props = {
  /**
   * 子元素进入动画的延迟时间（默认：0.05s）
   */
  staggerIn?: number;
  /**
   * 整体进入动画的延迟时间（默认：0.05s）
   */
  delayIn?: number;
  /**
   * 子元素退出动画的延迟时间（默认：0.05s）
   */
  staggerOut?: number;
};

/**
 * 容器动画变量
 */
export const varContainer = (props?: Props) => {
  const staggerIn = props?.staggerIn || 0.05;
  const delayIn = props?.delayIn || 0.05;
  const staggerOut = props?.staggerOut || 0.05;

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn, // 子元素动画的交错时间
        delayChildren: delayIn, // 子元素动画的延迟时间
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut, // 子元素退出动画的交错时间
        staggerDirection: -1, // 子元素退出顺序与进入顺序相反
      },
    },
  };
};
