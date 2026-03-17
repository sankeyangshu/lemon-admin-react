import { CheckCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@/components/custom/divider';
import { cn } from '@/lib/utils';
import { ThemeColorsPresets } from '@/provider/theme';
import { useAppStore } from '@/store/app';

function ThemeColor() {
  const { t } = useTranslation();

  const themeColor = useAppStore((state) => state.system.theme.color);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.appearance.themeColor')}
      </Divider>
      <div className="flex flex-wrap gap-1">
        {Object.entries(ThemeColorsPresets).map(([preset, color]) => (
          <div
            key={preset}
            className={cn(
              `
                relative flex h-13 w-5 cursor-pointer items-center justify-center rounded-sm p-1
                transition-all duration-300 ease-in-out
              `,
              themeColor === preset && 'w-13',
            )}
            style={{ backgroundColor: color.default }}
            onClick={() => setTheme('color', preset as App.Theme.ThemeColor)}
          >
            <div
              className={cn(
                `
                  flex size-full items-center justify-center rounded-sm transition-all duration-300
                  ease-in-out
                  hover:bg-white/30
                `,
                themeColor === preset && 'bg-white/30',
              )}
            >
              {themeColor === preset && <CheckCheck size={24} color="white" />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ThemeColor;
