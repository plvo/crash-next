import { Prisma } from '@prisma/client';

type UserWithPublication = Prisma.userGetPayload<{
  include: {
    publications: true;
  };
}>;

type PublicationWithAuthor = Prisma.publicationsGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        pseudo: true;
        email: true;
        phone: true;
        role: true;
        profile_img: true;
      };
    };
  };
}>;
