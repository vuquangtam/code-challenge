import { PriceService } from '@/services/api';
import type { Price } from '@/types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

const usePricesData = (): UseQueryResult<Price[], Error> => {
  return useQuery<Price[]>({
    queryKey: ['prices'],
    queryFn: () => PriceService.getList(),
  });
};

const useTokenPrice = (symbol: string) => {
  const { data: prices, isLoading, error } = usePricesData();

  const tokenPrice = prices?.find((p) => p.currency === symbol);

  return {
    price: tokenPrice?.price,
    isLoading,
    error,
  };
};
export { usePricesData, useTokenPrice };
