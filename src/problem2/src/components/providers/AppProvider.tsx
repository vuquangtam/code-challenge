import { Toaster, TooltipProvider } from '@/components/ui';
import { QUERY_CLIENT_CONFIG, THEME_CONFIG } from '@/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider {...THEME_CONFIG}>
          <TooltipProvider>
            <Toaster richColors position='top-center' />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export { AppProvider };
