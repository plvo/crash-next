'use server';

import { withActionWrapper } from '@/lib/action-wrappers';
import type { PublicationWithAuthor } from '@/types/prisma';

export interface CreatePublicationOptions {
  authorId: string;
  title: string;
  content: string;
}

export const createPublication = async ({ authorId, title, content }: CreatePublicationOptions) => {
  return withActionWrapper<PublicationWithAuthor>(async (prisma) => {
    const publication = (await prisma.publication.create({
      data: {
        title,
        content,
        authorId,
        published: true,
        createdAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            email: true,
            phone: true,
            profileImg: true,
            role: true,
          },
        },
      },
    })) satisfies PublicationWithAuthor;

    if (publication) {
      return publication;
    }

    throw new Error('Publication not created');
  });
};
