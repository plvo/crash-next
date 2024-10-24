"use client";

import { userGet } from "@/handlers/user.get";
import { userPostUpdate } from "@/handlers/user.post";
import { user } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { ReturnUser } from "@/types/api";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

export const useUser = <T extends boolean, U extends boolean>(
  id: string,
  withPublications: T = false as T,
  withAll: U = false as U,
  onSuccessMut?: () => void
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { update } = useSession();
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await userGet(id, withPublications, withAll, true);

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch user profile");
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
    mutationFn: async (newData: Partial<user>): Promise<ReturnUser<T, U>> => {
      try {
        const response = await userPostUpdate(
          id,
          newData,
          withPublications,
          withAll
        );

        if (!response.ok) {
          throw new Error(response.message || "Failed to update profile");
        }

        const { email, profile_img: image, name, pseudo, role } = response.data;

        const newSessionData: User = {
          id,
          name,
          email,
          pseudo,
          image,
          role,
        };

        await update(newSessionData);
        router.refresh(); // refresh session client side TODO: improve

        return response.data as ReturnUser<T, U>;
      } catch (error) {
        console.error("error mutfn", error);
        throw new Error((error as Error).message);
      }
    },
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(["user", id], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      await onSuccessMut?.();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error: Error) => {
      console.log("error mut", error);
      toast({
        title: "Failed to update profile",
        variant: "destructive",
        description:
          (error as Error).message ||
          "An error occurred while updating your profile",
      });
    },
  });

  return {
    query: {
      user,
      isLoading,
      isQueryError,
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
