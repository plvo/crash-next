'use client';

import type { ApiResponse } from '@/types/api';
import {
  type UseMutationResult,
  type UseSuspenseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * A custom hook that wraps the `useSuspenseQuery` from `@tanstack/react-query` to handle API queries.
 * It provides a streamlined way to fetch data with support for initial data, error handling, and query options.
 *
 * @template TData - The type of the data returned by the query.
 * @template TError - The type of the error returned by the query.
 *
 * @param {UseApiQueryOptions<TData, TError>} options - The options for the query.
 * @param {QueryKeyT} options.queryKey - The unique key for the query, used for caching and invalidation.
 * @param {TData} [options.initialData] - Optional initial data to populate the query before the fetch completes.
 * @param {() => Promise<ApiResponse<TData>>} options.actionFn - The function that performs the API request and returns a promise.
 * @param {QuerySuspenseOptions<TData, TError>} [options.queryOptions] - Additional options for the query, such as retry behavior.
 *
 * @returns {UseSuspenseQueryResult<TData, TError>} - The result of the query, including the data, error, and loading state.
 * @throws {Error} If the API response is not successful (`ok` is `false`), an error is thrown with the response message.
 *
 * @example
 * ```typescript
 * const { data } = useActionQuery({
 *   queryKey: ['user', userId],
 *   actionFn: () => fetchUserById(userId),
 *   initialData: { id: userId, name: 'Loading...' },
 * });
 * ```
 */
export function useActionQuery<TData = unknown, TError = unknown>({
  queryKey,
  initialData,
  actionFn,
  queryOptions = {},
}: UseApiQueryOptions<TData, TError>): UseSuspenseQueryResult<TData, TError> {
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

/**
 * A custom hook that wraps the `useMutation` from `@tanstack/react-query` to handle API mutations.
 * It provides a streamlined way to perform mutations with support for success and error handling,
 * toast notifications, and query invalidation.
 *
 * @template TData - The type of the data returned by the mutation.
 * @template TError - The type of the error returned by the mutation.
 * @template TVariables - The type of the variables passed to the mutation function.
 *
 * @param {MutationOptions<TData, TVariables>} options - The options for the mutation.
 * @param {(variables: TVariables) => Promise<ApiResponse<TData>>} options.actionFn - The function that performs the mutation and returns a promise.
 * @param {Event<TData, unknown, TVariables>} options.successEvent - The event triggered on a successful mutation.
 * @param {Event<unknown, unknown, TVariables>} options.errorEvent - The event triggered on a failed mutation.
 * @param {QueryKeyT[]} [options.invalidateQueries=[]] - An array of query keys to invalidate upon a successful mutation.
 *
 * @returns {UseMutationResult<ApiResponse<TData>, TError, TVariables>} - The result of the mutation, including the mutate function and its state.
 *
 * @example
 * ```typescript
 * const { mutate, isLoading } = useActionMutation({
 *   actionFn: updateUser,
 *   successEvent: {
 *     toast: {
 *       title: 'User updated',
 *       description: 'The user profile has been updated successfully.',
 *     },
 *     fn: (data, variables) => {
 *       console.log('Mutation successful:', data, variables);
 *     },
 *   },
 *   errorEvent: {
 *     toast: {
 *       title: 'Update failed',
 *       description: 'An error occurred while updating the user profile.',
 *     },
 *     fn: (error, variables) => {
 *       console.error('Mutation failed:', error, variables);
 *     },
 *   },
 *   invalidateQueries: [['user', userId]],
 * });
 *
 * mutate({ id: userId, name: 'New Name' });
 * ```
 */
export function useActionMutation<TData = unknown, TError = unknown, TVariables = void>({
  actionFn,
  successEvent,
  errorEvent,
  invalidateQueries = [],
}: MutationOptions<TData, TVariables>): UseMutationResult<ApiResponse<TData>, TError, TVariables> {
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
