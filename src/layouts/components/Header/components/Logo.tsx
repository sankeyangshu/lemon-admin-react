import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, type LinkProps } from 'react-router';
import SvgIcon from '@/components/SvgIcon';

interface Props extends Omit<LinkProps, 'to'> {
  isShowTitle?: boolean;
}

const Logo: FC<Props> = ({ className, isShowTitle = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={`w-full flex-center overflow-hidden whitespace-nowrap ${className}`}
      to={import.meta.env.VITE_APP_HOMEPAGE}
      {...props}
    >
      <SvgIcon localIcon="logo" className="text-30 text-primary" />
      <h2
        className="pl-8 text-16 text-primary font-bold transition duration-300 ease-in-out"
        style={{ display: isShowTitle ? 'block' : 'none' }}
      >
        {t('system.title')}
      </h2>
    </Link>
  );
};

export default memo(Logo);
