import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setupI18n } from './locales';
import { setupIconifyOffline, setupLoading } from './plugins';
import './styles/global.css';

async function bootstrap() {
  await setupI18n();

  setupLoading();

  setupIconifyOffline();

  const container = document.getElementById('root');

  if (!container)
    return;

  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
