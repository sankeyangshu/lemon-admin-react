import { useFullscreen } from 'ahooks';
import ButtonIcon from '@/components/ButtonIcon';

const ScreenFull = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <ButtonIcon
      localIcon={isFullscreen ? 'exit-fullscreen' : 'fullscreen'}
      className="px-12"
      onClick={toggleFullscreen}
    />
  );
};

export default ScreenFull;
