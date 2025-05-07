import type { VariantsType } from '@/types/animate';
import { varTranEnter, varTranExit } from './transition';

/**
 * 淡入淡出动画
 * @param props 动画配置类型
 */
export const varFade = (props?: VariantsType) => {
  const distance = props?.distance || 120;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;
  const path = props?.path;

  return {
    // IN
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: varTranEnter },
      exit: { opacity: 0, transition: varTranExit },
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        y: distance,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        y: -distance,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        x: -distance,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        x: distance,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inTopRight: {
      initial: { opacity: 0, top: path?.top?.[0], left: path?.left?.[0] },
      animate: {
        opacity: path?.opacity || 1,
        top: path?.top,
        left: path?.left,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },

    // OUT
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: {
        y: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        y: 0,
        opacity: 1,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: {
        y: distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        y: 0,
        opacity: 1,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: {
        x: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        x: 0,
        opacity: 1,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: {
        x: distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        x: 0,
        opacity: 1,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
  };
};
