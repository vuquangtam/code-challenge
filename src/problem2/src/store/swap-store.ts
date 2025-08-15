import { create } from 'zustand';

export interface SwapStore {
  fromCurrency: string;
  toCurrency: string;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  swapCurrencies: () => void;
}

export const useSwapStore = create<SwapStore>((set, get) => ({
  fromCurrency: 'ETH',
  toCurrency: 'USDC',
  setFromCurrency: (currency: string) => set({ fromCurrency: currency }),
  setToCurrency: (currency: string) => set({ toCurrency: currency }),
  swapCurrencies: () => {
    const { fromCurrency, toCurrency } = get();
    set({ fromCurrency: toCurrency, toCurrency: fromCurrency });
  },
}));
