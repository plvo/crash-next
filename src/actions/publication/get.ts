'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse } from '@/types/api';
import type { PublicationWithAuthor } from '@/types/prisma';
import { PrismaClient, type Publication } from '@prisma/client';

const prisma = new PrismaClient();

interface GetPublicationOptions {
  id: string;
}

export const getPublication = async ({ id }: GetPublicationOptions): Promise<ApiResponse<PublicationWithAuthor>> => {
  try {
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

export const getAllPublications = async (): Promise<ApiResponse<PublicationWithAuthor[]>> => {
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

export const getAllPublicationsByAuthor = async (authorId: string): Promise<ApiResponse<PublicationWithAuthor[]>> => {
  try {
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

    if (!publications) {
      return {
        ok: false,
        message: 'Publications not found',
      };
    }

    return { ok: true, data: publications };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};
