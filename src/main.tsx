import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import ErrorFallback from './components/ErrorFallback';
import { setupI18n } from './locales'; // 引入国际化配置
import 'virtual:svg-icons-register'; // svg-icons注册导入
import './styles/index.less'; // 引入全局样式
import 'virtual:uno.css'; // 引入unocss

function bootstrap() {
  setupI18n(); // 初始化国际化

  const container = document.getElementById('root');
  if (!container) return;
  const root = createRoot(container);
  root.render(
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <App />
    </ErrorBoundary>
  );
}

bootstrap();
