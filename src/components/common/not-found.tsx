import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import notFound from '@/assets/svg-icon/not-found.svg';
import { Button } from '../ui/button';

function NotFound() {
  const { t } = useTranslation();

  const elements = [
    {
      id: 'title',
      content: (
        <div className="mb-5 text-xl/10 font-bold text-primary">
          {t('system.notFound')}
        </div>
      ),
    },
    {
      id: 'description',
      content: <div className="mb-7.5 text-sm/5 text-gray-500">{t('system.checkUrl')}</div>,
    },
    {
      id: 'link',
      content: (
        <Link to="/">
          <Button>{t('system.goHome')}</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="box-border size-full p-2.5">
      <div className="flex flex-col items-center justify-center">
        <img className="pointer-events-none size-100" src={notFound} alt="Not Found" />
        <div className="text-center">
          {elements.map((item, index) => (
            <div
              key={item.id}
              className="animate-in duration-320 ease-in fade-in slide-in-from-bottom-[120px]"
              style={{
                animationDelay: `${(index + 1) * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
