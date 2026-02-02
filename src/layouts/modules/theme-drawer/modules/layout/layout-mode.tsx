import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { Divider } from '@/components/custom/divider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app';

/**
 * 布局卡片配置项
 */
type LayoutConfig = Record<
  App.Config.LayoutMode,
  {
    title: string;
    placement: TooltipPrimitive.Positioner.Props['side'];
  }
>;

/**
 * 布局模式卡片Props
 */
interface LayoutModeCardProps extends Record<App.Config.LayoutMode, React.ReactNode> {
  mode: App.Config.LayoutMode;
  disabled?: boolean;
}

function LayoutModeCard({ mode, disabled, ...rest }: LayoutModeCardProps) {
  const { t } = useTranslation();

  const setLayout = useAppStore((state) => state.setLayout);

  const layoutConfig: LayoutConfig = {
    'vertical': {
      title: t('theme.drawer.layout.layoutMode.vertical'),
      placement: 'bottom',
    },
    'vertical-mix': {
      title: t('theme.drawer.layout.layoutMode.vertical-mix'),
      placement: 'bottom',

    },
    'vertical-hybrid-header-first': {
      title: t('theme.drawer.layout.layoutMode.vertical-hybrid-header-first'),
      placement: 'bottom',
    },
    'horizontal': {
      title: t('theme.drawer.layout.layoutMode.horizontal'),
      placement: 'bottom',
    },
    'top-hybrid-sidebar-first': {
      title: t('theme.drawer.layout.layoutMode.top-hybrid-sidebar-first'),
      placement: 'bottom',
    },
    'top-hybrid-header-first': {
      title: t('theme.drawer.layout.layoutMode.top-hybrid-header-first'),
      placement: 'bottom',
    },
  };

  function handleChangeMode(mode: App.Config.LayoutMode) {
    if (disabled)
      return;

    setLayout('mode', mode);
  }

  return (
    <div className="
      grid grid-cols-2 gap-x-4 gap-y-3
      md:grid-cols-3
    "
    >
      {Object.entries(layoutConfig).map(([key, item]) => (
        <div key={key} className="flex cursor-pointer flex-col items-center justify-center" onClick={() => handleChangeMode(key as App.Config.LayoutMode)}>
          <Tooltip>
            <TooltipTrigger render={(props) => (
              <div
                {...props}
                className={cn(`
                  h-16 w-24 gap-1.5 rounded-sm p-1.5 ring-2 ring-transparent transition-all
                  hover:ring-primary
                `, mode === key && 'ring-primary!')}
              >
                <div className={cn('size-full gap-1', key.includes('vertical')
                  ? 'flex'
                  : `flex flex-col`)}
                >
                  {rest[key as App.Config.LayoutMode]}
                </div>
              </div>
            )}
            />
            <TooltipContent side={item.placement}>
              <p>{t(`theme.drawer.layout.layoutMode.${key}_detail`)}</p>
            </TooltipContent>
          </Tooltip>
          <p className="mt-2 text-xs">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

function LayoutMode() {
  const { t } = useTranslation();

  const { layoutMode, isMobile } = useAppStore(useShallow((state) => ({
    layoutMode: state.themeConfig.layout.mode,
    isMobile: state.systemConfig.isMobile,
  })));

  const layoutComponents: Record<App.Config.LayoutMode, React.ReactNode> = {
    'vertical': (
      <>
        <div className="h-full w-4.5 rounded-sm bg-primary/30"></div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-4 rounded-sm bg-primary/20"></div>
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
    'vertical-mix': (
      <>
        <div className="h-full w-2 rounded-sm bg-primary"></div>
        <div className="h-full w-4 rounded-sm bg-primary/30"></div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-4 rounded-sm bg-primary/20"></div>
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
    'vertical-hybrid-header-first': (
      <>
        <div className="h-full w-2 rounded-sm bg-primary"></div>
        <div className="h-full w-4 rounded-sm bg-primary/30"></div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-4 rounded-sm bg-primary"></div>
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
    'horizontal': (
      <>
        <div className="h-4 rounded-sm bg-primary"></div>
        <div className="flex flex-1 gap-1.5">
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
    'top-hybrid-sidebar-first': (
      <>
        <div className="h-4 rounded-sm bg-primary/30"></div>
        <div className="flex flex-1 gap-1.5">
          <div className="w-4.5 rounded-sm bg-primary"></div>
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
    'top-hybrid-header-first': (
      <>
        <div className="h-4 rounded-sm bg-primary"></div>
        <div className="flex flex-1 gap-1.5">
          <div className="w-4.5 rounded-sm bg-primary/30"></div>
          <div className="flex-1 rounded-sm bg-primary/20"></div>
        </div>
      </>
    ),
  };

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.layout.layoutMode.title')}
      </Divider>
      <LayoutModeCard mode={layoutMode} disabled={isMobile} {...layoutComponents} />
    </>
  );
}

export default LayoutMode;
