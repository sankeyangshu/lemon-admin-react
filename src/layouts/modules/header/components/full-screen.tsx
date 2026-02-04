import { useFullscreen } from '@reactuses/core';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/custom/svg-icon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function FullScreen() {
  const { t } = useTranslation();

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <Tooltip>
      <TooltipTrigger render={(
        <Button variant="ghost" className="group cursor-pointer" onClick={toggleFullscreen}>
          <SvgIcon
            icon={isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'}
            className="size-6!"
          />
        </Button>
      )}
      />
      <TooltipContent>
        <p>{ isFullscreen ? t('theme.header.fullScreen.exit') : t('theme.header.fullScreen.enter')}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default FullScreen;
