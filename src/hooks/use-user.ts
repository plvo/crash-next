'use client';

import { getUser, updateUser } from '@/actions';
import type { UpdateUserOptions } from '@/actions/user/update';
import { useActionMutation, useActionQuery } from '@/hooks/use-action';
import type { ReturnUser } from '@/types/api';
import type { User } from '@prisma/client';
import type { User as AuthUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUserQuery<T extends boolean, U extends boolean>({
  id,
  initialData,
  withPublications = false as T,
  withAll = false as U,
}: QueryHooksOptions<ReturnUser<T, U>>) {
  return useActionQuery<ReturnUser<T, U>>({
    initialData,
    queryKey: ['user', id],
    actionFn: () => getUser<T, U>({ idOrPseudo: id, withPublications, withAll }),
  });
}

export function useUserMutation<T extends boolean, U extends boolean>({
  invalidateQueries,
  onSuccess,
  onError,
}: MutationHooksOptions<UpdateUserOptions<T, U>>) {
  const { update } = useSession();
  const router = useRouter();

  const mutation = useActionMutation<ReturnUser<T, U>, unknown, UpdateUserOptions<T, U>>({
    actionFn: updateUser,
    invalidateQueries,
    successEvent: {
      toast: {
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      },
      fn: async (data, variables) => {
        if (!data) return;

        // Update the session
        await update({
          ...variables?.data,
          id: variables.id,
        } satisfies Partial<AuthUser>);

        // Redirect to the user profile page if the pseudo has changed
        if (variables?.data.pseudo) {
          router.push(`/user/${variables.data.pseudo}`);
        }

        onSuccess?.(data, variables);
      },
    },
    errorEvent: {
      toast: {
        title: 'Profile update failed',
        description: 'An error occurred while updating your profile',
      },
      fn: (error) => {
        console.error('Error updating profile:', error);
        toast.error('An error occurred while updating your profile', {
          description: error instanceof Error ? error.message : 'Please try again later.',
        });
        onError?.(error);
      },
    },
  });

  // Function to update user profile
  const updateUserProfile = (id: string, data: Partial<User>) => {
    mutation.mutate({
      id,
      data,
      withPublications: true as T,
      withAll: false as U,
    });
  };

  return {
    ...mutation,
    mutate: updateUserProfile,
  };
}
