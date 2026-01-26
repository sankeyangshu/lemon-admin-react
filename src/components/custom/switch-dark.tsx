import { cn } from '@/lib/utils';
import { DARK_MODE_MEDIA_QUERY, useTheme } from '@/provider/theme';
import { Button } from '../ui/button';

function SwitchDark() {
  const { theme, setTheme } = useTheme();

  // 判断当前是否为暗黑模式
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia(DARK_MODE_MEDIA_QUERY).matches);

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={handleToggle}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
        className={cn(
          'size-6 text-gray-700 transition-all duration-400 ease-in-out',
          'dark:text-gray-300',
        )}
        style={{ transform: isDark ? 'rotate(40deg)' : 'rotate(90deg)' }}
      >
        <mask id="moon-mask-switch">
          <rect x={0} y={0} width={20} height={20} fill="white" />
          <circle
            cx={11}
            cy={3}
            r={8}
            fill="black"
            className="transition-transform duration-640 ease-[cubic-bezier(0.41,0.64,0.32,1.575)]"
            style={{
              transform: isDark ? 'translate(0px, 0px)' : 'translate(16px, -3px)',
            }}
          />
        </mask>
        <circle
          className="origin-center transition-transform duration-400 ease-in-out"
          cx={10}
          cy={10}
          r={8}
          mask="url(#moon-mask-switch)"
          style={{
            transform: isDark ? 'scale(1)' : 'scale(0.55)',
          }}
        />
        <g>
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-0 duration-400 zoom-in',
            )}
            cx={18}
            cy={10}
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-50 duration-400 zoom-in',
            )}
            cx={14}
            cy="16.928"
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-100 duration-400 zoom-in',
            )}
            cx={6}
            cy="16.928"
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-170 duration-400 zoom-in',
            )}
            cx={2}
            cy={10}
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-250 duration-400 zoom-in',
            )}
            cx={6}
            cy="3.1718"
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
          <circle
            className={cn(
              'origin-center',
              !isDark && 'animate-in delay-290 duration-400 zoom-in',
            )}
            cx={14}
            cy="3.1718"
            r="1.5"
            style={{
              transform: isDark ? 'scale(0)' : 'scale(1)',
            }}
          />
        </g>
      </svg>
    </Button>
  );
}

export default SwitchDark;
