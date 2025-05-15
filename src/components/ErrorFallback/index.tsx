import { Button, Typography } from 'antd';
import Icon from '../Icon';
import type { FallbackProps } from 'react-error-boundary';

const isDev = import.meta.env.DEV;
const { Text, Title } = Typography;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="box-border wh-full flex-center flex-col px-50 py-20">
      <Icon localIcon="error" size={400} />

      {isDev ? (
        <Text type="danger">{error.message}</Text>
      ) : (
        <Title level={3}>抱歉，出错了，请稍后再试</Title>
      )}
      <Button type="primary" onClick={resetErrorBoundary}>
        刷新重试
      </Button>
    </div>
  );
};

export default ErrorFallback;
