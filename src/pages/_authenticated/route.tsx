import { createFileRoute } from '@tanstack/react-router';
import AdminLayout from '@/layouts';
import { useRouteStore } from '@/store/route';

/**
 * 该路由是后台管理系统的根路由，用于渲染后台管理系统的布局和内容
 */
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // 在权限路由加载前，初始化菜单
    await useRouteStore.getState().initMenus();
  },
  component: AdminLayout,
});
