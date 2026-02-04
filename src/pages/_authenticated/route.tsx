import { createFileRoute } from '@tanstack/react-router';
import AdminLayout from '@/layouts/admin';

/**
 * 该路由是后台管理系统的根路由，用于渲染后台管理系统的布局和内容
 */
export const Route = createFileRoute('/_authenticated')({
  component: AdminLayout,
});
