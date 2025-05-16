import errorBg from '@/assets/images/403.png';
import ErrorBase from './components/ErrorBase';

const Forbidden = () => {
  return <ErrorBase title="forbidden" errorBg={errorBg} />;
};

export default Forbidden;
