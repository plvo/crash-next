'use server';

import { withActionWrapper } from '@/lib/action-wrappers';
import type { User } from '@prisma/client';

interface CreateUserOptions {
  userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
}

export const createUser = async ({ userData }: CreateUserOptions) => {
  return withActionWrapper<User>(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (user) {
      return user;
    }

    throw new Error('User not created');
  });
};
