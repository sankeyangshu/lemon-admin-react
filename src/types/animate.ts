/**
 * 动画配置类型
 */
export type VariantsType = {
  durationIn?: number;
  durationOut?: number;
  easeIn?: [];
  easeOut?: [];
  distance?: number;
  path?: {
    opacity?: number[];
    top?: string[];
    bottom?: string[];
    left?: string[];
    right?: string[];
  };
};

/**
 * 过渡动画类型
 */
export type TranHoverType = {
  duration?: number;
  ease?: [];
};

/**
 * 过渡动画进入类型
 */
export type TranEnterType = {
  durationIn?: number;
  easeIn?: [];
};

/**
 * 过渡动画退出类型
 */
export type TranExitType = {
  durationOut?: number;
  easeOut?: [];
};
