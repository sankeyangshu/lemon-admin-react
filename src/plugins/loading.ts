import { i18n } from '@/locales';

/**
 * Setup plugin Loading
 * @descCN 设置 Loading 插件
 */
export function setupLoading() {
  const loading = `
  <div class="fixed left-0 top-0 flex size-full flex-col items-center justify-center">
    <div class="relative mx-auto my-9 size-12">
      <div class="absolute inset-0 rounded-sm bg-primary" style="animation: jump-loader 0.5s linear infinite;"></div>
      <div class="absolute left-0 top-15 h-[5px] w-12 rounded-[50%] bg-primary/30" style="animation: shadow-loader 0.5s linear infinite;"></div>
    </div>
    <div class="text-2xl font-medium text-primary/80">${i18n.t('system.title')}</div>
  </div>
  <style>
    @keyframes jump-loader {
      15% {
        border-bottom-right-radius: 3px;
      }
      25% {
        transform: translateY(9px) rotate(22.5deg);
      }
      50% {
        transform: translateY(18px) scale(1, 0.9) rotate(45deg);
        border-bottom-right-radius: 40px;
      }
      75% {
        transform: translateY(9px) rotate(67.5deg);
      }
      100% {
        transform: translateY(0) rotate(90deg);
      }
    }
    @keyframes shadow-loader {
      0%, 100% {
        transform: scale(1, 1);
      }
      50% {
        transform: scale(1.2, 1);
      }
    }
  </style>`;

  const app = document.querySelector('#root');

  if (app) {
    app.innerHTML = loading;
  }
}
