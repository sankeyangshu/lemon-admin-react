import errorBg from '@/assets/images/500.png';
import ErrorBase from './components/ErrorBase';

const ServerError = () => {
  return <ErrorBase title="serverError" errorBg={errorBg} />;
};

export default ServerError;
