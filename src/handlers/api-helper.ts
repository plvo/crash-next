import type { ApiErrorResponse, ApiResponse, ApiSuccessResponse } from '@/types/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FetchOptions = RequestInit & {
  requiresAuth?: boolean;
};

export interface FetchApiOptions<D = unknown> {
  endpoint: string;
  method: HttpMethod;
  body?: D;
  options?: FetchOptions;
}

export async function fetchApi<T = unknown, D = unknown>({
  endpoint,
  method,
  body,
  options = {},
}: FetchApiOptions<D>): Promise<ApiResponse<T>> {
  const { requiresAuth = false, ...fetchOptions } = options;

  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...(options.headers ||
          {
            // Bearer token ?
          }),
      },
      ...fetchOptions,
    };

    if (body) {
      requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const result = await fetch(endpoint, requestOptions);

    const response = await result.json().catch(() => ({}));

    if (!result.ok) {
      if (response && typeof response === 'object' && 'ok' in response && response.ok === false) {
        return response as ApiErrorResponse;
      }

      return {
        ok: false,
        message: response.message || `Error: ${result.status} ${result.statusText}`,
      };
    }

    if (response && typeof response === 'object' && 'ok' in response && response.ok === true) {
      return response as ApiSuccessResponse<T>;
    }

    return {
      ok: true,
      data: response as T,
    };
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    return {
      ok: false,
      message: 'An error occurred while processing the request.',
    };
  }
}
