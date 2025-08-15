import { type SwapQuote } from '@/types';
import { useMemo } from 'react';
import { usePricesData } from '.';

const useCurrencySwap = (
  fromCurrency: string,
  toCurrency: string,
  amount: string
) => {
  const { data: prices, isLoading } = usePricesData();

  const quote: SwapQuote | null = useMemo(() => {
    if (!prices || !fromCurrency || !toCurrency) {
      return null;
    }

    if (!amount || amount.trim() === '') {
      return null;
    }

    const fromAmount = parseFloat(amount);
    if (isNaN(fromAmount) || fromAmount <= 0) {
      return null;
    }

    const fromPrice = prices.find((p) => p.currency === fromCurrency)?.price;
    const toPrice = prices.find((p) => p.currency === toCurrency)?.price;

    if (!fromPrice || !toPrice) {
      return null;
    }

    const rate = fromPrice / toPrice;
    const toAmount = fromAmount * rate;

    const impact = Math.abs((rate - 1) * 100);

    return {
      fromAmount,
      toAmount,
      rate,
      fromCurrency,
      toCurrency,
      impact,
    };
  }, [prices, fromCurrency, toCurrency, amount]);

  return {
    quote,
    isLoading,
  };
};

export { useCurrencySwap };
