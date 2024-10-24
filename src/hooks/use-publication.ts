// "use client";

// import { useRouter } from "next/navigation";
// import type { User } from "next-auth";
// import { useSession } from "next-auth/react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { user } from "@prisma/client";
// import { useToast } from "./use-toast";
// import { userGet } from "@/handlers/user.get";
// import { userPostUpdate } from "@/handlers/user.post";
// import { ReturnUser } from "@/types/api";

// export const useUser = <T extends boolean, U extends boolean>(
//   pseudo: string,
//   withPublications: T = false as T,
//   withAll: U = false as U,
//   onSuccessMut?: () => void
// ) => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { update } = useSession();
//   const { toast } = useToast();

//   const {
//     data: newUserData,
//     mutateAsync: updateUser,
//     isPending: isUpdating,
//     isError: isMutError,
//     error: mutError,
//   } = useMutation({
//     mutationFn: async (newData: Partial<user>): Promise<ReturnUser<T, U>> => {
//       try {
//       } catch (error) {
//         console.error("error mutfn", error);
//         throw new Error((error as Error).message);
//       }
//     },
//     onSuccess: async (updatedUser) => {
//       queryClient.setQueryData(["user", pseudo], updatedUser);
//       // queryClient.invalidateQueries({queryKey:["user"]});
//       onSuccessMut?.();
//       toast({
//         title: "Profile updated",
//         description: "Your profile has been updated successfully",
//       });
//     },
//     onError: (error: Error) => {
//       console.log("error mut", error);
//       toast({
//         title: "Failed to update profile",
//         variant: "destructive",
//         description:
//           (error as Error).message ||
//           "An error occurred while updating your profile",
//       });
//     },
//   });

//   return {
//     mutation: {
//       newUserData,
//       updateUser,
//       isUpdating,
//       isMutError,
//       mutError,
//     },
//   };
// };
