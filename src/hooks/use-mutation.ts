'use client';

import { type HttpMethod, fetchApi } from '@/handlers/api-helper';
import type { ApiResponse } from '@/types/api';
import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type QueryKeyT = readonly unknown[];

interface Event {
  message: string;
  onEvent: () => void;
}

interface MutationOptions<TData, TError, TVariables, TContext> {
  mutationOptions?: Omit<UseMutationOptions<ApiResponse<TData>, TError, TVariables, TContext>, 'mutationFn'>;
  fetchOptions?: RequestInit;
  success: Event | string;
  error: Event | string;
  invalidateQueries?: QueryKeyT[];
}

export function useApiMutation<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
  endpoint: string,
  method: HttpMethod = 'POST',
  options?: MutationOptions<TData, TError, TVariables, TContext>,
) {
  const queryClient = useQueryClient();
  const { mutationOptions = {}, fetchOptions = {}, success, error, invalidateQueries = [] } = options || {};

  return useMutation<ApiResponse<TData>, TError, TVariables, TContext>({
    ...mutationOptions,
    mutationFn: async (variables) => {
      return fetchApi({ endpoint, method, body: variables, options: { ...fetchOptions } });
    },

    onSuccess: async (response, variables, context) => {
      if (!response.ok) {
        throw new Error(response.message || 'Une erreur est survenue');
      }

      const successMessage = typeof success === 'string' ? success : (success as Event).message;
      const successOnEvent = typeof success === 'string' ? undefined : (success as Event).onEvent;

      if (successOnEvent) {
        successOnEvent();
      }

      if (successMessage) {
        toast.success(successMessage, {
          description: successMessage,
        });
      }

      if (response.ok && invalidateQueries.length > 0) {
        await Promise.all(invalidateQueries.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
      }

      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = typeof error === 'string' ? error : (error as Error).message || 'Une erreur est survenue';

      toast.error("Erreur lors de l'opération", {
        description: errorMessage,
      });

      if (mutationOptions.onError) {
        mutationOptions.onError(error, variables, context);
      }
    },
  });
}
