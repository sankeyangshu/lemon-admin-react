import { Dropdown } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonIcon from '@/components/ButtonIcon';
import { useLanguageContext } from '@/provider/LangProvider/utils';

const Language = () => {
  const { t } = useTranslation();

  const { locale, localeOptions, setLocale } = useLanguageContext();

  const onChangeLocales = ({ key }: { key: string }) => {
    setLocale(key as App.I18n.LangType);
  };

  return (
    <Dropdown menu={{ items: localeOptions, onClick: onChangeLocales, selectedKeys: [locale] }}>
      <div>
        <ButtonIcon
          localIcon="language"
          className="px-12"
          tooltipContent={t('layoutHeader.langTooltip')}
          tooltipPlacement="left"
        />
      </div>
    </Dropdown>
  );
};

export default memo(Language);
