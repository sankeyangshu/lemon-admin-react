import { getHex, getHsv, isValidColor, mixColor } from '@/utils/color';
import type { AnyColor, HsvColor } from 'colord';

/**
 * The color index of color palette
 * @descCN 颜色索引
 * From left to right, the color is from light to dark, 6 is main color
 */
type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Hue step */
const hueStep = 2;
/** Saturation step, light color part */
const saturationStep = 16;
/** Saturation step, dark color part */
const saturationStep2 = 5;
/** Brightness step, light color part */
const brightnessStep1 = 5;
/** Brightness step, dark color part */
const brightnessStep2 = 15;
/** Light color count, main color up */
const lightColorCount = 5;
/** Dark color count, main color down */
const darkColorCount = 4;

/**
 * Get hue
 * @descCN 获取色调
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
const getHue = (hsv: HsvColor, i: number, isLight: boolean) => {
  let hue: number;

  const hsvH = Math.round(hsv.h);

  if (hsvH >= 60 && hsvH <= 240) {
    hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i;
  } else {
    hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  }

  if (hue >= 360) {
    hue -= 360;
  }

  return hue;
};

/**
 * Get saturation
 * @descCN 获取饱和度
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
const getSaturation = (hsv: HsvColor, i: number, isLight: boolean) => {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  let saturation: number;

  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }

  if (saturation > 100) {
    saturation = 100;
  }

  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }

  if (saturation < 6) {
    saturation = 6;
  }

  return saturation;
};

/**
 * Get value of hsv
 * @descCN 获取hsv的值
 * @param hsv - Hsv format color
 * @param i - The relative distance from 6
 * @param isLight - Is light color
 */
const getValue = (hsv: HsvColor, i: number, isLight: boolean) => {
  let value: number;

  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 100) {
    value = 100;
  }

  return value;
};

/**
 * Get AntD palette color by index
 * @descCN 获取颜色索引对应的antd颜色
 * @param color - Color
 * @param index - The color index of color palette (the main color index is 6)
 * @returns Hex color
 */
export const getAntDPaletteColorByIndex = (color: AnyColor, index: ColorIndex): string => {
  if (!isValidColor(color)) {
    throw new Error('invalid input color value');
  }

  if (index === 6) {
    return getHex(color);
  }

  const isLight = index < 6;
  const hsv = getHsv(color);
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  };

  return getHex(newHsv);
};

/** Map of dark color index and opacity */
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 5, opacity: 0.9 },
  { index: 4, opacity: 0.93 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

/**
 * Get AntD color palette
 * @descCN 获取antd颜色
 * @param color - Color
 * @param darkTheme - Dark theme
 * @param darkThemeMixColor - Dark theme mix color (default: #141414)
 */
export const getAntDColorPalette = (
  color: AnyColor,
  darkTheme = false,
  darkThemeMixColor = '#141414'
): string[] => {
  const indexes: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const patterns = indexes.map((index) => getAntDPaletteColorByIndex(color, index));

  if (darkTheme) {
    const darkPatterns = darkColorMap.map(({ index, opacity }) => {
      const darkColor = mixColor(darkThemeMixColor, patterns[index], opacity);

      return darkColor;
    });

    return darkPatterns.map((item) => getHex(item));
  }

  return patterns;
};

/**
 * Get color palette
 * @descCN 获取颜色
 * @param color - Color
 * @returns Color palette
 */
export const getColorPalette = (color: AnyColor) => {
  const colorMap = new Map<App.Theme.ColorPaletteNumber, string>();

  const colors = getAntDColorPalette(color);

  const colorNumbers: App.Theme.ColorPaletteNumber[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  colorNumbers.forEach((number, index) => {
    colorMap.set(number, colors[index]);
  });

  return colorMap;
};
