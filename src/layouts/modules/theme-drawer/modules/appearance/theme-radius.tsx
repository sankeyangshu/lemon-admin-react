import { useTranslation } from 'react-i18next';
import { Divider } from '@/components/custom/divider';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/app';
import SettingItem from '../../components/setting-item';

function ThemeRadius() {
  const { t } = useTranslation();

  const themeRadius = useAppStore((state) => state.themeConfig.themeRadius);
  const setThemeConfig = useAppStore((state) => state.setThemeConfig);

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.appearance.themeRadius')}
      </Divider>
      <SettingItem label={t('theme.drawer.appearance.themeRadius')}>
        <Input
          type="number"
          value={themeRadius}
          onChange={(e) => setThemeConfig({ themeRadius: Number(e.target.value) })}
          className="w-full max-w-30"
        />
      </SettingItem>
    </>
  );
}

export default ThemeRadius;
