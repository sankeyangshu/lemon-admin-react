import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/system/user/')({
  staticData: {
    title: '用户管理',
    icon: 'lucide:users',
    order: 1,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>系统用户</div>;
}
