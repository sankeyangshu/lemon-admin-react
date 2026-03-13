import type { QueryClient } from '@tanstack/react-query';
import { useTitle } from '@reactuses/core';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet, useMatches } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { useTranslation } from 'react-i18next';
import NavigationProgress from '@/components/common/navigation-progress';
import { TooltipProvider } from '@/components/ui/tooltip';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { t } = useTranslation();
  const matches = useMatches();

  // 获取当前路由的 staticData（最后一个匹配的路由）
  const currentMatch = matches.at(-1);
  const { i18nKey, title: staticTitle } = currentMatch?.staticData ?? {};

  // 页面标题守卫：优先使用 i18nKey 翻译，其次使用 title，最后使用默认标题
  const documentTitle = i18nKey !== undefined ? t(i18nKey) : (staticTitle ?? t('system.title'));

  useTitle(documentTitle);

  return (
    <>
      <TooltipProvider>
        <NavigationProgress />
        <Outlet />
      </TooltipProvider>
      {import.meta.env.MODE === 'development' && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false,
            },
          ]}
        />
      )}
    </>
  );
}
