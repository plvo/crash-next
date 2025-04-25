'use server';

import { withActionWrapper } from '@/lib/action-wrappers';
import type { Publication } from '@prisma/client';

export interface CreatePublicationOptions {
  authorId: string;
  title: string;
  content: string;
}

export const createPublication = async ({ authorId, title, content }: CreatePublicationOptions) => {
  return withActionWrapper<Publication>(async (prisma) => {
    const publication = await prisma.publication.create({
      data: {
        title,
        content,
        authorId,
        published: true,
        createdAt: new Date(),
      },
    });

    if (publication) {
      return publication;
    }

    throw new Error('Publication not created');
  });
};
