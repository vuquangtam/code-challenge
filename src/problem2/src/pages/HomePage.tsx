import { CurrencySwapForm } from '@/components/shared';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name='description' content={t('seo.description')} />
      </Helmet>

      <div className='container mx-auto mt-6'>
        <div className='mb-12 text-center'>
          <h1 className='bg-gradient-primary mb-4 bg-clip-text text-2xl font-bold text-transparent lg:text-4xl'>
            {t('title')}
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-base lg:text-lg'>
            {t('description')}
          </p>
        </div>

        <div className='flex justify-center max-lg:px-5'>
          <CurrencySwapForm />
        </div>
      </div>
    </>
  );
};

export default Page;
