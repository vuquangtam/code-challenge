import { TokenService } from '@/services/api';
import type { Token } from '@/types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

const useTokensData = (): UseQueryResult<Token[], Error> => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: () => TokenService.getList(),
    staleTime: 60 * 60 * 0.5, // 30 minutes
  });
};

const useTokenSearch = (searchQuery: string) => {
  const { data: tokens, isLoading, error } = useTokensData();

  const filteredTokens = useMemo(() => {
    if (!tokens) return [];
    if (!searchQuery) return tokens;

    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tokens, searchQuery]);

  const popularTokens = useMemo(() => {
    return filteredTokens.filter((token) => token.category === 'popular');
  }, [filteredTokens]);

  return {
    tokens: filteredTokens,
    popularTokens,
    isLoading,
    error,
  };
};

export { useTokensData, useTokenSearch };
