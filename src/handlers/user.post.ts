'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse, ReturnUser } from '@/types/api';
import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

export const userPostUpdate = async <T extends boolean, U extends boolean>(
  id: string,
  data: Partial<User>,
  withPublications: T = false as T,
  withAll: U = false as U,
): Promise<ApiResponse<ReturnUser<T, U>>> => {
  try {
    console.log('data', data);
    console.log(id);
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
