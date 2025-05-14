import Router from '@/router';
import { LazyAnimate } from './components/Animate';
import AntdConfigProvider from './provider/AntdConfig';
import LangProvider from './provider/LangProvider';
import ThemeProvider from './provider/Theme';

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AntdConfigProvider>
          <LazyAnimate>
            <Router />
          </LazyAnimate>
        </AntdConfigProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
