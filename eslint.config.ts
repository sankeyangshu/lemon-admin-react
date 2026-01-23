import antfu from '@antfu/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginTailwindcss from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    ignores: ['**/routeTree.gen.ts'],
    isInEditor: false,
    rules: {
      'style/arrow-parens': ['error', 'always'], // 箭头函数参数始终添加括号
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }], // 括号样式
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: { 'ts/no-misused-promises': ['error', {
      checksVoidReturn: {
        attributes: false,
      },
    }] },
  },
  {
    plugins: {
      'better-tailwindcss': pluginTailwindcss,
    },
    rules: {
      // enable all recommended rules to report an error
      ...pluginTailwindcss.configs['recommended-error'].rules,

      // or configure rules individually
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
  {
    plugins: {
      '@tanstack/router': pluginRouter,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      ...pluginRouter.configs.recommended.rules,
      ...pluginQuery.configs.recommended.rules,
    },
  },
);
