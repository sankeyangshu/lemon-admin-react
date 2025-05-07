import { domMax, LazyMotion, m } from 'motion/react';
import type { PropsWithChildren } from 'react';

/**
 * 动画懒加载
 */
export const LazyAnimate = ({ children }: PropsWithChildren) => {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
};
