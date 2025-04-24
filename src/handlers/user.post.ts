'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse, ReturnUser } from '@/types/api';
// import { UserWithPublication } from "@/types/prisma";
import { PrismaClient, type user } from '@prisma/client';

const prisma = new PrismaClient();

export const userPostUpdate = async <T extends boolean, U extends boolean>(
  id: string,
  data: Partial<user>,
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
        updated_at: new Date(),
      },

      select: {
        id: true,
        name: true,
        pseudo: true,
        email: true,
        phone: true,
        role: true,
        profile_img: true,
        password: withAll,
        created_at: withAll,
        updated_at: withAll,
        publications: withPublications,
      },
    });

    console.log('withPublications', withPublications);
    console.log('withAll', withAll);
    console.log(user);

    return {
      ok: true,
      data: user as ReturnUser<T, U>,
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  }
};
