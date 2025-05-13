import { m } from 'motion/react';
import { varContainer } from './variants/container';
import type { FC, PropsWithChildren } from 'react';

/**
 * 动画容器组件
 */
export const MotionContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      className={className}
    >
      {children}
    </m.div>
  );
};
