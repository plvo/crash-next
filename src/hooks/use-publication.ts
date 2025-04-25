'use client';

import { createPublication, getPublication } from '@/actions';
import type { PublicationWithAuthor } from '@/types/prisma';
import type { Publication } from '@prisma/client';
import { useActionMutation, useActionQuery } from './use-action';

export function UsePublicationQuery({ id, initialData }: QueryHooksOptions<PublicationWithAuthor>) {
  return useActionQuery({
    initialData,
    queryKey: ['publication', id],
    actionFn: () => getPublication({ id }),
  });
}

export function usePublicationMutation({ invalidateQueries, onSuccess, onError }: MutationHooksOptions<Publication>) {
  return useActionMutation<PublicationWithAuthor, unknown, Publication>({
    actionFn: createPublication,
    invalidateQueries,
    successEvent: {
      toast: {
        title: 'Publication created',
        description: 'Your publication has been created successfully',
      },
      fn: async (res, variables) => {
        if (!res) return;

        onSuccess?.(res, variables);
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
