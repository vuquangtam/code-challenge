import { API_ENDPOINTS } from '@/constants';
import { mockGet } from '@/libs';
import type { Price } from '@/types';

export class PriceService {
  static async getList(): Promise<Price[]> {
    const response = await mockGet<Price[]>(API_ENDPOINTS.PRICES);
    return response.data;
  }
}
