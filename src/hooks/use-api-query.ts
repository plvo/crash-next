'use client';

import { fetchApi } from '@/handlers/api-helper';
import type { ApiResponse } from '@/types/api';
import { type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

type QueryKeyT = string[];

export interface UseApiQueryOptions<TData, TError> {
  queryKey: QueryKeyT;
  endpoint: string;
  queryOptions?: Omit<UseQueryOptions<ApiResponse<TData>, TError, TData, QueryKeyT>, 'queryKey' | 'queryFn' | 'select'>;
  fetchOptions?: RequestInit;
}

export function useApiQuery<TData = unknown, TError = unknown>({
  queryKey,
  endpoint,
  queryOptions = {},
  fetchOptions = {},
}: UseApiQueryOptions<TData, TError>) {
  return useSuspenseQuery<ApiResponse<TData>, TError, TData, QueryKeyT>({
    queryKey,
    ...queryOptions,
    queryFn: async () =>
      fetchApi<TData>({
        endpoint,
        method: 'GET',
        options: {
          ...fetchOptions,
          requiresAuth: false,
        },
      }),
    select: (response) => {
      if (!response.ok) {
        throw new Error(response.message || 'An error occurred');
      }
      return response.data;
    },
  });
}
