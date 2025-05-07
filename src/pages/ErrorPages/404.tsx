import errorBg from '@/assets/images/404.png';
import ErrorBase from './components/ErrorBase';

const NotFound = () => {
  return <ErrorBase title="页面不存在！" errorBg={errorBg} />;
};

export default NotFound;
