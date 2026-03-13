import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/system/menu/')({
  staticData: {
    title: '菜单管理',
    icon: 'lucide:list-tree',
    order: 3,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>菜单管理</div>;
}
