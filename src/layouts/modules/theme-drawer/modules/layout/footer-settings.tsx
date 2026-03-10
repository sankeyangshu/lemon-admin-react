import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { Divider } from '@/components/custom/divider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/store/app';
import SettingItem from '../../components/setting-item';

function FooterSettings() {
  const { t } = useTranslation();

  const { layoutMode, scrollMode, footerVisible, footerFixed, footerHeight, footerRight, setFooter } = useAppStore(useShallow((state) => ({
    layoutMode: state.system.layout.mode,
    scrollMode: state.system.layout.scrollMode,
    footerVisible: state.system.footer.visible,
    footerFixed: state.system.footer.fixed,
    footerHeight: state.system.footer.height,
    footerRight: state.system.footer.right,
    setFooter: state.setFooter,
  })));

  const isWrapperScrollMode = scrollMode === 'wrapper';
  const isMixHorizontalMode = ['top-hybrid-sidebar-first', 'top-hybrid-header-first'].includes(layoutMode);

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.layout.footer.title')}
      </Divider>
      <SettingItem label={t('theme.drawer.layout.footer.visible')}>
        <Switch checked={footerVisible} onCheckedChange={(checked) => setFooter('visible', checked)} />
      </SettingItem>
      {footerVisible && isWrapperScrollMode && (
        <SettingItem label={t('theme.drawer.layout.footer.fixed')}>
          <Switch checked={footerFixed} onCheckedChange={(checked) => setFooter('fixed', checked)} />
        </SettingItem>
      )}
      {footerVisible && (
        <SettingItem label={t('theme.drawer.layout.footer.height')}>
          <Input
            type="number"
            value={footerHeight}
            onChange={(e) => setFooter('height', Number(e.target.value))}
            className="w-full max-w-30"
          />
        </SettingItem>
      )}
      {footerVisible && isMixHorizontalMode && (
        <SettingItem label={t('theme.drawer.layout.footer.right')}>
          <Switch checked={footerRight} onCheckedChange={(checked) => setFooter('right', checked)} />
        </SettingItem>
      )}
    </>
  );
}

export default FooterSettings;
