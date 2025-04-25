'use server';

import { withActionWrapper } from '@/lib/action-wrappers';
import type { ReturnUser } from '@/types/api';
import type { User } from '@prisma/client';

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
}: UpdateUserOptions<T, U>) => {
  return withActionWrapper<ReturnUser<T, U>>(async (prisma) => {
    const user = await prisma.user.update({
      where: { id },
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

    if (user) {
      return user as ReturnUser<T, U>;
    }
    throw new Error('User not found');
  });
};
