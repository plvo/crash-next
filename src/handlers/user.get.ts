'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse, ReturnUser } from '@/types/api';
import type { UserWithPublication } from '@/types/prisma';
import { PrismaClient, type user } from '@prisma/client';

const prisma = new PrismaClient();

const userGet = async <T extends boolean, U extends boolean>(
  id: string,
  withPublications?: T,
  withAll?: U,
  withPseudo = false,
): Promise<ApiResponse<ReturnUser<T, U>>> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        ...(withPseudo ? { pseudo: id } : { id }),
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

    if (user) {
      return {
        ok: true,
        data: user as ReturnUser<T, U>,
      };
    }
    return {
      ok: false,
      message: 'user not found',
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

const userGetAll = async <T extends boolean>(
  withPublications?: T,
): Promise<ApiResponse<T extends true ? UserWithPublication[] : user[]>> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        publications: withPublications as boolean,
      },
    });
    return {
      ok: true,
      data: users as T extends true ? UserWithPublication[] : user[],
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

export { userGet, userGetAll };
