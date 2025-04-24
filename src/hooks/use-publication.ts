'use client';

import { createPublication, getPublication } from '@/actions';
import type { PublicationWithAuthor } from '@/types/prisma';
import type { Publication } from '@prisma/client';
import { useActionMutation, useActionQuery } from './use-action';

type PublicationData<T extends boolean> = T extends true ? PublicationWithAuthor : Publication;

interface UsePublicationOptions<T extends boolean> {
  id: string;
  initialData: PublicationData<T>;
  withAuthor?: T;
}

export function UsePublication<T extends boolean>({
  id,
  initialData,
  withAuthor = false as T,
}: UsePublicationOptions<T>) {
  const queryKey = ['publication', id];

  const { data: publication } = useActionQuery<PublicationData<T>>({
    initialData,
    queryKey,
    actionFn: () => getPublication<T>({ id, withAuthor }),
  });

  const mutation = useActionMutation<PublicationData<T>>({
    actionFn: createPublication,
    invalidateQueries: [queryKey],
    successEvent: {
      toast: {
        title: 'Publication created',
        description: 'Your publication has been created successfully',
      },
    },
    errorEvent: {
      toast: {
        title: 'Error creating publication',
        description: 'An error occurred while creating your publication',
      },
    },
  });

  return {
    publication,
    createPublication: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
