'use client';

import { getUser, updateUser } from '@/actions';
import type { UpdateUserOptions } from '@/actions/user/update';
import { useActionMutation, useActionQuery } from '@/hooks/use-action';
import type { ReturnUser } from '@/types/api';
import type { User } from '@prisma/client';
import type { User as AuthUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface UseUserOptions<T extends boolean, U extends boolean> {
  id: string;
  initialData?: ReturnUser<T, U>;
  withPublications?: T;
  withAll?: U;
}

export function useUser<T extends boolean, U extends boolean>({
  id,
  initialData,
  withPublications = false as T,
  withAll = false as U,
}: UseUserOptions<T, U>) {
  const { update } = useSession();
  const router = useRouter();
  const queryKey = ['user', id];

  const { data: user } = useActionQuery<ReturnUser<T, U>>({
    initialData,
    queryKey,
    actionFn: () => getUser({ idOrPseudo: id, withPublications, withAll }),
  });

  const mutation = useActionMutation<ReturnUser<T, U>, unknown, UpdateUserOptions<T, U>>({
    actionFn: updateUser,
    successEvent: {
      toast: {
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      },
      fn: async () => {
        if (!user) return;

        // Update the session with the new user data
        await update({
          ...mutation.variables?.data,
          id: user.id,
        } satisfies Partial<AuthUser>);

        // If the pseudo has changed, redirect to the new profile page
        if (mutation.variables?.data.pseudo) {
          router.push(`/user/${mutation.variables.data.pseudo}`);
        }

        router.refresh();
      },
    },
    errorEvent: {
      toast: {
        title: 'Profile update failed',
        description: 'An error occurred while updating your profile',
      },
    },
    invalidateQueries: [queryKey],
  });

  // Helper function to update user with proper types
  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;

    mutation.mutate({
      id: user.id,
      data,
      withPublications,
      withAll,
    });
  };

  return {
    user,
    updateUser: updateUserProfile,
    isUpdating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
