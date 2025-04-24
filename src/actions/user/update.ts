'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse, ReturnUser } from '@/types/api';
import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

export interface UpdateUserOptions<T extends boolean, U extends boolean> {
  id: string;
  data: Partial<User>;
  withPublications: T;
  withAll: U;
}

export const updateUser = async <T extends boolean, U extends boolean>({
  id,
  data,
  withPublications = false as T,
  withAll = false as U,
}: UpdateUserOptions<T, U>): Promise<ApiResponse<ReturnUser<T, U>>> => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },

      select: {
        id: true,
        name: true,
        pseudo: true,
        email: true,
        phone: true,
        role: true,
        profileImg: true,
        password: withAll,
        createdAt: withAll,
        updatedAt: withAll,
        publications: withPublications,
      },
    });
    return {
      ok: true,
      data: user as ReturnUser<T, U>,
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  }
};
