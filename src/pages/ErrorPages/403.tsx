import errorBg from '@/assets/images/403.png';
import ErrorBase from './components/ErrorBase';

const Forbidden = () => {
  return <ErrorBase title="您没有访问权限！" errorBg={errorBg} />;
};

export default Forbidden;
