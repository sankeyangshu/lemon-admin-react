import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { Divider } from '@/components/custom/divider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/store/app';
import SettingItem from '../../components/setting-item';

function HeaderSettings() {
  const { t } = useTranslation();

  const { height, breadcrumbVisible, breadcrumbShowIcon } = useAppStore(useShallow((state) => ({
    height: state.themeConfig.header.height,
    breadcrumbVisible: state.themeConfig.header.breadcrumb.visible,
    breadcrumbShowIcon: state.themeConfig.header.breadcrumb.showIcon,
  })));
  const setHeader = useAppStore((state) => state.setHeader);

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.layout.header.title')}
      </Divider>
      <SettingItem label={t('theme.drawer.layout.header.height')}>
        <Input
          type="number"
          value={height}
          onChange={(e) => setHeader({ height: Number(e.target.value) })}
          className="w-full max-w-30"
        />
      </SettingItem>
      <SettingItem label={t('theme.drawer.layout.header.breadcrumb.visible')}>
        <Switch checked={breadcrumbVisible} onCheckedChange={(checked) => setHeader({ breadcrumb: { visible: checked, showIcon: breadcrumbShowIcon } })} />
      </SettingItem>
      {
        breadcrumbVisible && (
          <SettingItem label={t('theme.drawer.layout.header.breadcrumb.showIcon')}>
            <Switch checked={breadcrumbShowIcon} onCheckedChange={(checked) => setHeader({ breadcrumb: { visible: breadcrumbVisible, showIcon: checked } })} />
          </SettingItem>
        )
      }
    </>
  );
}

export default HeaderSettings;
