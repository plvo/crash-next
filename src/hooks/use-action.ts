'use client';

import type { ApiResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

type QuerySuspenseOptions<TData, TError> = Omit<
  UseQueryOptions<ApiResponse<TData>, TError, TData, QueryKeyT>,
  'queryKey' | 'queryFn' | 'select'
>;

export interface UseApiQueryOptions<TData, TError> {
  queryKey: QueryKeyT;
  initialData?: TData;
  queryOptions?: QuerySuspenseOptions<TData, TError>;
  actionFn: () => Promise<ApiResponse<TData>>;
}

export function useActionQuery<TData = unknown, TError = unknown>({
  queryKey,
  initialData,
  actionFn,
  queryOptions = {},
}: UseApiQueryOptions<TData, TError>) {
  return useSuspenseQuery<ApiResponse<TData>, TError, TData, QueryKeyT>({
    queryKey,
    initialData: initialData ? ({ ok: true, data: initialData } as ApiResponse<TData>) : undefined,
    queryFn: actionFn,
    select: (response) => {
      if (!response.ok) {
        throw new Error(response.message || 'An error occurred');
      }
      return response.data;
    },
    retry: 1,
    ...queryOptions,
  });
}

interface Toast {
  title?: string;
  description: string;
}

interface Event<TData = unknown, TError = unknown, TVariables = unknown> {
  toast?: Toast;
  fn?: (data: TData | TError, variables: TVariables, context: unknown) => void;
}

interface MutationOptions<TData, TVariables> {
  actionFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
  successEvent: Event<TData, unknown, TVariables>;
  errorEvent: Event<unknown, unknown, TVariables>;
  invalidateQueries?: QueryKeyT[];
}

export function useActionMutation<TData = unknown, TError = unknown, TVariables = void>({
  actionFn,
  successEvent,
  errorEvent,
  invalidateQueries = [],
}: MutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TData>, TError, TVariables>({
    mutationFn: actionFn,
    onSuccess: async (res, vars, context) => {
      if (!res.ok) {
        throw new Error(res.message || 'An error occurred');
      }
      if (successEvent?.toast) {
        const { title, description } = successEvent.toast;
        toast.success(title || 'Success', {
          description,
        });
      }
      if (successEvent?.fn) {
        successEvent.fn(res, vars, context);
      }
      if (res.ok && invalidateQueries.length > 0) {
        await Promise.all(invalidateQueries.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
      }
    },
    onError: (error, vars, context) => {
      if (errorEvent?.toast) {
        const { title, description } = errorEvent.toast;
        toast.error(title || 'Error', {
          description,
        });
      }
      if (errorEvent?.fn) {
        errorEvent.fn(error, vars, context);
      }
    },
  });
}
