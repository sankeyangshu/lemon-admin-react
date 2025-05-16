import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../SvgIcon';
import type { FallbackProps } from 'react-error-boundary';

const isDev = import.meta.env.DEV;
const { Text, Title } = Typography;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="box-border wh-full flex-center flex-col px-50 py-20">
      <SvgIcon localIcon="error" size={400} />

      {isDev ? (
        <Text type="danger">{error.message}</Text>
      ) : (
        <Title level={3}>{t('system.errorFallback')}</Title>
      )}
      <Button type="primary" onClick={resetErrorBoundary}>
        {t('system.refreshAgain')}
      </Button>
    </div>
  );
};

export default ErrorFallback;
