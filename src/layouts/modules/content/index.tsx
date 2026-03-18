import { Outlet } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface Props {
  /** 是否关闭内边距 */
  closePadding?: boolean;
}

function Content({ closePadding = false }: Props) {
  return (
    <div className={cn(`h-full grow bg-background`, !closePadding && 'p-4')}>
      <Outlet />
    </div>
  );
}

export default Content;
