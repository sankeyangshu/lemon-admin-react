import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/system/role/')({
  staticData: {
    title: '角色管理',
    icon: 'lucide:shield',
    order: 2,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>角色管理</div>;
}
