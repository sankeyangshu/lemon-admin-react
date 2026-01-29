import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/custom/svg-icon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/store/app';

function ThemeConfig() {
  const { t } = useTranslation();

  const toggleThemeDrawer = useAppStore((state) => state.toggleThemeDrawer);

  return (
    <Tooltip>
      <TooltipTrigger render={(
        <Button variant="ghost" className="group cursor-pointer" onClick={() => toggleThemeDrawer()}>
          <SvgIcon
            icon="line-md:cog"
            className="
              size-5! transition-transform duration-500
              group-hover:rotate-180
            "
          />
        </Button>
      )}
      />
      <TooltipContent>
        <p>{t('theme.drawer.title')}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default ThemeConfig;
