import { mockPost } from '@/libs';
import type { SwapQuoteRequest, SwapResult } from '@/types';

export class SwapService {
  static async swap(request: SwapQuoteRequest): Promise<SwapResult> {
    try {
      await mockPost('/api/swap', request, 1500);

      return {
        success: true,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'error.swapFailed',
      };
    }
  }
}
