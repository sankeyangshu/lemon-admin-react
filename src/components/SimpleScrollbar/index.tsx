import SimpleBar from 'simplebar-react';
import type { FC, PropsWithChildren } from 'react';
import 'simplebar-react/dist/simplebar.min.css';

const SimpleScrollbar: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={`h-full flex-1-hidden ${className}`}>
      <SimpleBar className="h-full">{children}</SimpleBar>
    </div>
  );
};

export default SimpleScrollbar;
