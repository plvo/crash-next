'use server';

import { createAction, withActionWrapper } from '@/lib/action-wrappers';
import type { ReturnUser } from '@/types/api';
import type { UserWithPublication } from '@/types/prisma';
import type { User } from '@prisma/client';

interface GetUserOptions<T extends boolean = false, U extends boolean = false> {
  idOrPseudo: string;
  withPublications?: T;
  withAll?: U;
}

export const getUser = async <T extends boolean, U extends boolean>({
  idOrPseudo,
  withPublications = false as T,
  withAll = false as U,
}: GetUserOptions<T, U>) => {
  return withActionWrapper<ReturnUser<T, U>>(async (prisma) => {
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
      return user as ReturnUser<T, U>;
    }

    throw new Error('User not found');
  });
};

export const getAllUsers = async <T extends boolean>(withPublications?: T) => {
  return withActionWrapper<T extends true ? UserWithPublication[] : User[]>(async (prisma) => {
    const users = await prisma.user.findMany({
      include: {
        publications: withPublications as boolean,
      },
    });

    if (users.length > 0) {
      return users as T extends true ? UserWithPublication[] : User[];
    }

    throw new Error('No users found');
  });
};
