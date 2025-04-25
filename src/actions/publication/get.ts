'use server';

import { withActionWrapper } from '@/lib/action-wrappers';
import type { PublicationWithAuthor } from '@/types/prisma';

interface GetPublicationOptions {
  id: string;
}

export const getPublication = async ({ id }: GetPublicationOptions) => {
  return withActionWrapper<PublicationWithAuthor>(async (prisma) => {
    const publication = await prisma.publication.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            email: true,
            phone: true,
            role: true,
            profileImg: true,
          },
        },
      },
    });

    if (publication) {
      return publication;
    }

    throw new Error('Publication not found');
  });
};

export const getAllPublications = async () => {
  return withActionWrapper<PublicationWithAuthor[]>(async (prisma) => {
    const publications = await prisma.publication.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            email: true,
            phone: true,
            role: true,
            profileImg: true,
          },
        },
      },
    });

    return publications;
  });
};

export const getAllPublicationsByAuthor = async (authorId: string) => {
  return withActionWrapper<PublicationWithAuthor[]>(async (prisma) => {
    const publications = await prisma.publication.findMany({
      where: {
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            email: true,
            phone: true,
            role: true,
            profileImg: true,
          },
        },
      },
    });

    return publications;
  });
};
