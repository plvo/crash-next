import type { Prisma } from '@prisma/client';

export type UserWithPublication = Prisma.UserGetPayload<{
  include: {
    publications: true;
  };
}>;

export type PublicationWithAuthor = Prisma.PublicationGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        pseudo: true;
        email: true;
        phone: true;
        role: true;
        profileImg: true;
      };
    };
  };
}>;
