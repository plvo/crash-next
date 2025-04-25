'use client';

import {
  type CreatePublicationOptions,
  createPublication,
  getAllPublicationsByAuthor,
  getPublication,
} from '@/actions';
import type { PublicationWithAuthor } from '@/types/prisma';
import { useActionMutation, useActionQuery } from './use-action';

export function UsePublicationQuery({ id, initialData }: QueryHooksOptions<PublicationWithAuthor>) {
  return useActionQuery({
    initialData,
    queryKey: ['publication', id],
    actionFn: () => getPublication({ id }),
  });
}

export function UsePublicationsQueryByAuthor({ initialData, authorId }: QueryHooksOptions<PublicationWithAuthor[]>) {
  return useActionQuery({
    initialData,
    queryKey: ['publications'],
    actionFn: () => getAllPublicationsByAuthor(authorId),
  });
}

export function useNewPublication({ onSuccess, onError }: MutationHooksOptions<CreatePublicationOptions>) {
  return useActionMutation<PublicationWithAuthor, unknown, CreatePublicationOptions>({
    actionFn: createPublication,
    invalidateQueries: [['publications']],
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
