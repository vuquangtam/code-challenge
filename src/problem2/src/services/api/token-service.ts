import { API_ENDPOINTS } from '@/constants';
import { mockGet } from '@/libs';
import type { Token } from '@/types';

export class TokenService {
  static async getList(): Promise<Token[]> {
    const response = await mockGet<Token[]>(API_ENDPOINTS.TOKENS);
    return response.data;
  }
}
