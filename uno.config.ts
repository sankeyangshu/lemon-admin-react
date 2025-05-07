import presetRemToPx from '@unocss/preset-rem-to-px';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: ['Fira Code'],
      },
    }),
  ],

  shortcuts: {
    'm-0-auto': 'm-0 ma', // margin: 0 auto
    'wh-full': 'w-full h-full', // width: 100%, height: 100%
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'text-overflow': 'overflow-hidden whitespace-nowrap text-ellipsis',
    'text-break': 'whitespace-normal break-all break-words',
  },

  transformers: [transformerDirectives(), transformerVariantGroup(), transformerAttributifyJsx()],
});
