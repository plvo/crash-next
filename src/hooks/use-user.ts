'use client';

import { userGet } from '@/handlers/user.get';
import { userPostUpdate } from '@/handlers/user.post';
import type { ReturnUser } from '@/types/api';
import type { User } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User as AuthUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

export const useUser = <T extends boolean, U extends boolean>(
  pseudo: string,
  withPublications: T = false as T,
  withAll: U = false as U,
  onSuccessMut?: () => void,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { update } = useSession();
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['user', pseudo],
    retry: 1,
    queryFn: async () => {
      const response = await userGet(pseudo, withPublications, withAll, true);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch user profile');
      }
      return response.data as ReturnUser<T, U>;
    },
  });

  const {
    data: newUserData,
    mutateAsync: updateUser,
    isPending: isUpdating,
    isError: isMutError,
    error: mutError,
  } = useMutation({
    mutationFn: async (newData: Partial<User>): Promise<ReturnUser<T, U>> => {
      try {
        if (!user) {
          throw new Error('User not found');
        }

        const response = await userPostUpdate(user.id, newData, withPublications, withAll);

        if (!response.ok) {
          throw new Error(response.message || 'Failed to update profile');
        }

        const newSessionData: Partial<AuthUser> = {
          ...response.data,
          id: user.id,
          image: response.data.profileImg,
        };

        await update(newSessionData);

        if (newData.pseudo) {
          router.push(`/user/${newData.pseudo}`);
        }
        router.refresh(); // refresh session client side TODO: improve

        return response.data as ReturnUser<T, U>;
      } catch (error) {
        console.error('error mutfn', error);
        throw new Error((error as Error).message);
      }
    },
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(['user', pseudo], updatedUser);
      // queryClient.invalidateQueries({queryKey:["user"]});
      onSuccessMut?.();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    },
    onError: (error: Error) => {
      console.log('error mut', error);
      toast({
        title: 'Failed to update profile',
        variant: 'destructive',
        description: (error as Error).message || 'An error occurred while updating your profile',
      });
    },
  });

  return {
    query: {
      user,
      isLoading,
      queryError,
    },
    mutation: {
      newUserData,
      updateUser,
      isUpdating,
      isMutError,
      mutError,
    },
  };
};
