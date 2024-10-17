"use server";

import { apiInternalError } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
import { PrismaClient, publications } from "@prisma/client";

const prisma = new PrismaClient();

const publicationGet = async (
  id: string
): Promise<ApiResponse<publications>> => {
  try {
    const publication = await prisma.publications.findUnique({
      where: {
        id,
      },
    });

    if (!publication) {
      return {
        ok: false,
        message: "Publication not found",
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

const publicationGetAll = async (): Promise<ApiResponse<publications[]>> => {
  try {
    const publications = await prisma.publications.findMany();
    return { ok: true, data: publications };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

const publicationGetByAuthor = async (
  author_id: string
): Promise<ApiResponse<publications[]>> => {
  try {
    const publications = await prisma.publications.findMany({
      where: {
        author_id,
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
