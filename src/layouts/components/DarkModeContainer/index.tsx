import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'div'> {
  inverted?: boolean;
}

const DarkModeContainer: FC<Props> = ({ children, className, inverted, ...rest }) => {
  return (
    <div
      className={`bg-container text-base-text transition-300 ${inverted ? 'bg-inverted text-#1f1f1f' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DarkModeContainer;
