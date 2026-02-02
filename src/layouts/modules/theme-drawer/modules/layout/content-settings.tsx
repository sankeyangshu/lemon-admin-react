import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { Divider } from '@/components/custom/divider';
import SvgIcon from '@/components/custom/svg-icon';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/store/app';
import SettingItem from '../../components/setting-item';

function ContentSettings() {
  const { t } = useTranslation();

  const { scrollMode } = useAppStore(useShallow((state) => ({
    scrollMode: state.themeConfig.layout.scrollMode,
  })));
  const setLayout = useAppStore((state) => state.setLayout);

  const modeOptions = [
    { label: t('theme.drawer.layout.content.scrollMode.wrapper'), value: 'wrapper' },
    { label: t('theme.drawer.layout.content.scrollMode.content'), value: 'content' },
  ];

  return (
    <>
      <Divider titlePlacement="center">
        {t('theme.drawer.layout.content.title')}
      </Divider>
      <SettingItem
        label={t('theme.drawer.layout.content.scrollMode.title')}
        suffix={(
          <Tooltip>
            <TooltipTrigger render={(props) => (
              <div {...props}>
                <SvgIcon icon="mdi:help-circle" className="size-4!" />
              </div>
            )}
            />
            <TooltipContent>
              <p>{t('theme.drawer.layout.content.scrollMode.tip')}</p>
            </TooltipContent>
          </Tooltip>
        )}
      >
        <Select
          items={modeOptions}
          value={scrollMode}
          onValueChange={(value) => setLayout('scrollMode', value as 'wrapper' | 'content')}
        >
          <SelectTrigger className="w-full max-w-30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {modeOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SettingItem>
    </>
  );
}

export default ContentSettings;
