'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse } from '@/types/api';
import type { PublicationWithAuthor } from '@/types/prisma';
import { PrismaClient, type Publication } from '@prisma/client';

const prisma = new PrismaClient();

const publicationGet = async (id: string): Promise<ApiResponse<Publication>> => {
  try {
    const publication = await prisma.publication.findUnique({
      where: {
        id,
      },
    });

    if (!publication) {
      return {
        ok: false,
        message: 'Publication not found',
      };
    }

    return { ok: true, data: publication };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

const publicationGetAll = async (): Promise<ApiResponse<PublicationWithAuthor[]>> => {
  try {
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
    return { ok: true, data: publications };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

const publicationGetByAuthor = async (idOrPseudo: string): Promise<ApiResponse<Publication[]>> => {
  try {
    const author = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrPseudo,
          },
          {
            pseudo: idOrPseudo,
          },
        ],
      },
    });

    if (!author) {
      return {
        ok: false,
        message: 'Author not found',
      };
    }

    const publications = await prisma.publication.findMany({
      where: {
        authorId: author.id,
      },
    });
    return { ok: true, data: publications };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

export { publicationGet, publicationGetAll, publicationGetByAuthor };
