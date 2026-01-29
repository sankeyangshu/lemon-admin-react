import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/app';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import SvgIcon from './svg-icon';

function MenuToggler() {
  const { t } = useTranslation();

  const sidebarCollapse = useAppStore((state) => state.systemConfig.sidebarCollapse);
  const setSystemConfig = useAppStore((state) => state.setSystemConfig);

  return (
    <Tooltip>
      <TooltipTrigger render={(
        <Button variant="ghost" onClick={() => setSystemConfig('sidebarCollapse', !sidebarCollapse)}>
          <SvgIcon
            icon={sidebarCollapse ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'}
            className="size-5!"
          />
        </Button>
      )}
      />
      <TooltipContent>
        <p>{sidebarCollapse ? t('theme.header.menuToggler.expand') : t('theme.header.menuToggler.collapse')}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default MenuToggler;
