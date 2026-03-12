import { GLOBAL_SIDEBAR_MENU_ID } from '@/config';
import { cn } from '@/lib/utils';
import { useTheme } from '@/provider/theme';
import Logo from '../logo';

interface Props {
  /** 布局模式 */
  layoutMode: App.Config.LayoutMode;
  /** 侧边栏反转色 */
  inverted: boolean;
  /** 侧边栏折叠状态 */
  sidebarCollapse: boolean;
  /** 头部高度 */
  headerHeight: number;
}

function Sidebar({ layoutMode, inverted, sidebarCollapse, headerHeight }: Props) {
  const { darkMode } = useTheme();

  const showLogo = layoutMode === 'vertical';

  const isTopHybridSidebarFirst = layoutMode === 'top-hybrid-sidebar-first';
  const isTopHybridHeaderFirst = layoutMode === 'top-hybrid-header-first';

  const darkMenu = !darkMode && !isTopHybridSidebarFirst && !isTopHybridHeaderFirst && inverted;

  return (
    <div className={cn(
      'flex size-full flex-col items-stretch bg-sidebar',
      darkMenu && 'bg-[#001428] text-[#1f1f1f]',
    )}
    >
      {showLogo && <Logo showTitle={!sidebarCollapse} style={{ height: `${headerHeight}px` }} />}

      <div
        className={showLogo ? 'flex-1 overflow-hidden' : 'h-full'}
        id={GLOBAL_SIDEBAR_MENU_ID}
      />
    </div>
  );
}

export default Sidebar;
