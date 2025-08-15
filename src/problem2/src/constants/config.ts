import type { QueryClientConfig } from '@tanstack/react-query';
import type { ThemeProviderProps } from 'next-themes';

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // 1 hour
      retry: 1,
    },
  },
};

export const THEME_CONFIG: ThemeProviderProps = {
  defaultTheme: 'dark',
  attribute: 'class',
};

export const MOBILE_BREAKPOINT = 768;
