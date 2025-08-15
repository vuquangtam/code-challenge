import { Button } from '@/components/ui';
import { cn } from '@/libs';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children, className } = props;
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <header className='bg-background/80 border-border sticky top-0 z-50 flex h-16 items-center border-b backdrop-blur-md'>
        <div className='container mx-auto flex items-center justify-between px-4 py-4'>
          <Link to='/' className='flex items-center gap-2'>
            <img src='/logo.svg' alt='logo' className='size-8' />
            <p className='text-lg font-bold'>{t('header.logo')}</p>
          </Link>

          <Button
            variant='plain'
            size='icon'
            onClick={() =>
              setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
            }
          >
            {theme === 'dark' ? (
              <Sun className='size-5' />
            ) : (
              <Moon className='size-5' />
            )}
          </Button>
        </div>
      </header>

      <main className='bg-beams flex-1'>{children}</main>

      <footer className='border-border bg-background/50 border-t backdrop-blur-sm'>
        <div className='text-muted-foreground container mx-auto px-4 py-4 text-center text-sm'>
          <p>{t('footer.description')}</p>
        </div>
      </footer>
    </div>
  );
};
