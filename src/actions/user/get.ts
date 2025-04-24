'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse, ReturnUser } from '@/types/api';
import type { UserWithPublication } from '@/types/prisma';
import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

interface GetUserOptions<T extends boolean = false, U extends boolean = false> {
  idOrPseudo: string;
  withPublications?: T;
  withAll?: U;
}

export const getUser = async <T extends boolean, U extends boolean>({
  idOrPseudo,
  withPublications = false as T,
  withAll = false as U,
}: GetUserOptions<T, U>): Promise<ApiResponse<ReturnUser<T, U>>> => {
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ id: idOrPseudo }, { pseudo: idOrPseudo }] },
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

export const getAllUsers = async <T extends boolean>(
  withPublications?: T,
): Promise<ApiResponse<T extends true ? UserWithPublication[] : User[]>> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        publications: withPublications as boolean,
      },
    });
    return {
      ok: true,
      data: users as T extends true ? UserWithPublication[] : User[],
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};
