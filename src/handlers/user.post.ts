"use server";

import { apiInternalError } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
// import { UserWithPublication } from "@/types/prisma";
import { PrismaClient, user } from "@prisma/client";

const prisma = new PrismaClient();

export const userPostEdit = async (
  id: string,
  data: Partial<user>
): Promise<ApiResponse<user>> => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });

    console.log(user);

    return {
      ok: true,
      data: user,
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  }
};
