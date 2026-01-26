import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import NotFound from './components/common/not-found';
import ServerError from './components/common/server-error';
import { LocaleProvider } from './provider/locale';
import { ThemeProvider } from './provider/theme';
import { routeTree } from './routeTree.gen';

// Create a client
const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ServerError,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  /**
   * 路由静态数据
   */
  interface StaticDataRouteOption {
    /**
     * 路由标题
     */
    title?: string;

    /**
     * 国际化key
     */
    i18nKey?: string;

    // 扩展更多...
  }
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
