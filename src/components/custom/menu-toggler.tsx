import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/app';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import SvgIcon from './svg-icon';

function MenuToggler() {
  const { t } = useTranslation();

  const [animationKey, setAnimationKey] = useState(0);
  const sidebarCollapse = useAppStore((state) => state.system.settings.sidebarCollapse);
  const setSettings = useAppStore((state) => state.setSettings);

  const handleToggle = () => {
    setSettings('sidebarCollapse', !sidebarCollapse);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <Tooltip>
      <TooltipTrigger render={(
        <Button variant="ghost" onClick={handleToggle}>
          <div className="flex size-5 items-center justify-center">
            <SvgIcon
              key={`${sidebarCollapse ? 'right' : 'left'}-${animationKey}`}
              icon={sidebarCollapse ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'}
              className="size-5!"
            />
          </div>
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
