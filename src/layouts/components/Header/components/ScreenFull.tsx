import { useFullscreen } from 'ahooks';
import { useTranslation } from 'react-i18next';
import ButtonIcon from '@/components/ButtonIcon';

const ScreenFull = () => {
  const { t } = useTranslation();

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <ButtonIcon
      localIcon={isFullscreen ? 'exit-fullscreen' : 'fullscreen'}
      className="px-12"
      tooltipContent={
        isFullscreen ? t('layoutHeader.exitFullScreenTooltip') : t('layoutHeader.fullScreenTooltip')
      }
      onClick={toggleFullscreen}
    />
  );
};

export default ScreenFull;
