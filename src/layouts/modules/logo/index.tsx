import type { ComponentProps } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/custom/svg-icon';
import { cn } from '@/lib/utils';

function Logo({ showTitle = true, className, ...props }: {
  showTitle?: boolean;
  className?: string;
} & ComponentProps<'a'>) {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      className={cn('flex w-full items-center justify-center overflow-hidden whitespace-nowrap', className)}
      {...props}
    >
      <SvgIcon localIcon="icon-logo" className="size-8!" />
      {showTitle && (
        <h2 className="pl-2 text-base font-bold text-primary transition duration-300 ease-in-out">
          {t('system.title')}
        </h2>
      )}
    </Link>
  );
}

export default Logo;
