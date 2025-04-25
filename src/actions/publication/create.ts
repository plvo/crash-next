'use server';

import { apiInternalError } from '@/lib/constants';
import type { ApiResponse } from '@/types/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePublicationOptions {
  authorId: string;
  title: string;
  content: string;
}

export const createPublication = async ({
  authorId,
  title,
  content,
}: CreatePublicationOptions): Promise<ApiResponse<any>> => {
  try {
    const publication = await prisma.publication.create({
      data: {
        title,
        content,
        authorId,
        published: true,
        createdAt: new Date(),
      },
    });

    return {
      ok: true,
      data: publication,
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};
