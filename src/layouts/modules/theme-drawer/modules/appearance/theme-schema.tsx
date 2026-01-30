import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import darkImg from '@/assets/images/dark.png';
import lightImg from '@/assets/images/light.png';
import systemImg from '@/assets/images/system.png';
import { Divider } from '@/components/custom/divider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTheme } from '@/provider/theme';
import { useAppStore } from '@/store/app';

interface ThemeItem {
  label: string;
  value: StorageType.Local['themeMode'];
  img: string;
}

function ThemeSchema() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const settingThemeList: ThemeItem[] = [
    {
      label: t('theme.drawer.appearance.themeSchema.light'),
      value: 'light',
      img: lightImg,
    },
    {
      label: t('theme.drawer.appearance.themeSchema.dark'),
      value: 'dark',
      img: darkImg,
    },
    {
      label: t('theme.drawer.appearance.themeSchema.auto'),
      value: 'system',
      img: systemImg,
    },
  ];

  const { greyMode, weakMode } = useAppStore(
    useShallow((state) => ({
      greyMode: state.themeConfig.greyMode,
      weakMode: state.themeConfig.weakMode,
    })),
  );

  const setThemeConfig = useAppStore((state) => state.setThemeConfig);

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.appearance.themeSchema.title')}
      </Divider>
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex w-full flex-wrap items-center gap-4">
          {settingThemeList.map((item) => (
            <div key={item.value} className="flex w-3/10 flex-col items-center justify-center">
              <div
                className={cn(
                  `
                    box-border flex h-13 cursor-pointer overflow-hidden rounded-lg border-2
                    transition-all duration-100
                  `,
                  theme === item.value
                    ? 'border-primary'
                    : `
                      border-border
                      hover:border-primary/50
                    `,
                )}
                onClick={() => setTheme(item.value)}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="pointer-events-none size-full object-cover"
                />
              </div>
              <div className="mt-1.5 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-sm">{t('theme.drawer.appearance.greyMode')}</div>
          <Switch checked={greyMode} onCheckedChange={(checked) => setThemeConfig({ greyMode: checked })} />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="text-sm">{t('theme.drawer.appearance.weakMode')}</div>
          <Switch checked={weakMode} onCheckedChange={(checked) => setThemeConfig({ weakMode: checked })} />
        </div>
      </div>
    </>
  );
}

export default ThemeSchema;
