import errorBg from '@/assets/images/500.png';
import ErrorBase from './components/ErrorBase';

const ServerError = () => {
  return <ErrorBase title="服务器错误！" errorBg={errorBg} />;
};

export default ServerError;
