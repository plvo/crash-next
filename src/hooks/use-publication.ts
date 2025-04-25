'use client';

import { createPublication, getPublication } from '@/actions';
import type { PublicationWithAuthor } from '@/types/prisma';
import type { Publication } from '@prisma/client';
import { useActionMutation, useActionQuery } from './use-action';

type PublicationData<T extends boolean> = T extends true ? PublicationWithAuthor : Publication;

export function UsePublicationQuery<T extends boolean>({
  id,
  initialData,
  withAuthor = false,
}: QueryHooksOptions<PublicationData<T>>) {
  return useActionQuery<PublicationData<T>>({
    initialData,
    queryKey: ['publication', id],
    actionFn: () => getPublication<T>({ id, withAuthor }),
  });
}

export function usePublicationMutation<T extends boolean>({
  invalidateQueries,
  onSuccess,
  onError,
}: MutationHooksOptions<Publication>) {
  return useActionMutation<PublicationData<T>, unknown, Publication>({
    actionFn: createPublication,
    invalidateQueries,
    successEvent: {
      toast: {
        title: 'Publication created',
        description: 'Your publication has been created successfully',
      },
      fn: async (data, variables) => {
        if (!data) return;

        onSuccess?.(data, variables);
      },
    },
    errorEvent: {
      toast: {
        title: 'Error creating publication',
        description: 'An error occurred while creating your publication',
      },
      fn: (error) => {
        console.error('Error creating publication:', error);
        onError?.(error);
      },
    },
  });
}
