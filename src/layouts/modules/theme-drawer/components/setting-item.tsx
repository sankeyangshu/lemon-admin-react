import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = PropsWithChildren<{
  className?: string;
  label: ReactNode;
  suffix?: ReactNode;
}>;

function SettingItem({ className, label, suffix, children }: Props) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm">{label}</span>
        {suffix}
      </div>
      {children}
    </div>
  );
}

export default SettingItem;
