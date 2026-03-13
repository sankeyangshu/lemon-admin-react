import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/home/')({
  staticData: {
    title: '首页',
    icon: 'lucide:house',
    order: 1,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>首页</div>;
}
