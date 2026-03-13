import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/system')({
  staticData: {
    title: '系统管理',
    icon: 'lucide:settings',
    order: 2,
  },
  component: () => <Outlet />,
});
