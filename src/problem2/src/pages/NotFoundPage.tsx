import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();
  const { t } = useTranslation('error');

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className='flex h-[calc(100vh-112px)] items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold'>{t('notFound.title')}</h1>
        <p className='text-foreground mb-4 text-xl'>{t('notFound.message')}</p>
        <a href='/' className='text-primary hover:underline'>
          {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
