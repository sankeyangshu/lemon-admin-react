import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/provider/theme';
import { Button } from '../ui/button';
import SvgIcon from './svg-icon';

function SwitchDark({ className }: { className?: string }) {
  const { darkMode, setTheme } = useTheme();
  const [animationKey, setAnimationKey] = useState(0);

  const handleToggle = () => {
    setTheme(darkMode ? 'light' : 'dark');
    // 通过改变 key 来强制重新渲染图标，从而重新触发动画
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={handleToggle}>
      <div className="flex size-6 items-center justify-center">
        <SvgIcon
          key={`${darkMode ? 'dark' : 'light'}-${animationKey}`}
          icon={darkMode ? 'line-md:sunny-outline-to-moon-transition' : 'line-md:moon-to-sunny-outline-transition'}
          className={cn(
            `
              size-6 text-gray-700
              dark:text-gray-300
            `,
            className,
          )}
        />
      </div>
    </Button>
  );
}

export default SwitchDark;
