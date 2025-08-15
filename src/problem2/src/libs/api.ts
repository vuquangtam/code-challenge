import type { ApiError, ApiResponse } from '@/types';

const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const mockGet = async <T>(
  endpoint: string,
  delay: number = 1000
): Promise<ApiResponse<T>> => {
  try {
    await simulateDelay(delay);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, status: 200, message: 'Success' };
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    } as ApiError;
  }
};

const mockPost = async <T, U>(
  endpoint: string,
  payload: U,
  delay: number = 800
): Promise<ApiResponse<T>> => {
  try {
    await simulateDelay(delay);
    console.log(`Mock POST to ${endpoint}:`, payload);
    return {
      data: payload as unknown as T,
      status: 201,
      message: 'Created successfully',
    };
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    } as ApiError;
  }
};

export { mockGet, mockPost, simulateDelay };
