export interface Price {
  currency: string;
  price: number;
  date: string;
}

export interface PriceUpdatePayload {
  currency: string;
  price: number;
}

export interface SwapQuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface SwapQuoteResponse {
  fromAmount: number;
  toAmount: number;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  impact: number;
}

export interface SwapExecuteRequest extends SwapQuoteRequest {
  slippageTolerance?: number;
}

export interface SwapResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}
