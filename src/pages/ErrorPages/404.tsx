import errorBg from '@/assets/images/404.png';
import ErrorBase from './components/ErrorBase';

const NotFound = () => {
  return <ErrorBase title="notFound" errorBg={errorBg} />;
};

export default NotFound;
