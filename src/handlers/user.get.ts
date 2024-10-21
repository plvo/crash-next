"use server";

import { apiInternalError } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
import { UserWithPublication } from "@/types/prisma";
import { PrismaClient, user } from "@prisma/client";

const prisma = new PrismaClient();

// Type helper pour définir les champs supplémentaires
type AdditionalFields = {
  password: string;
  created_at: Date;
  updated_at: Date;
};

// Type conditionnel pour déterminer le type de retour en fonction des paramètres
type UserReturnType<T extends boolean, U extends boolean> = T extends true
  ? U extends true
    ? UserWithPublication & AdditionalFields
    : UserWithPublication
  : U extends true
  ? user & AdditionalFields
  : Omit<user, keyof AdditionalFields>;

const userGet = async <T extends boolean, U extends boolean>(
  idOrPseudo: string,
  withPublications?: T,
  withAll?: U
): Promise<ApiResponse<UserReturnType<T, U>>> => {
  try {
    const user = await prisma.user.findFirst({
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
      select: {
        id: true,
        name: true,
        pseudo: true,
        email: true,
        phone: true,
        role: true,
        profile_img: true,
        password: withAll,
        created_at: withAll,
        updated_at: withAll,
        publications: withPublications,
      },
    });

    if (user) {
      return {
        ok: true,
        data: user as UserReturnType<T, U>,
      };
    }
    return {
      ok: false,
      message: "user not found",
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

const userGetAll = async <T extends boolean>(
  withPublications?: T
): Promise<ApiResponse<T extends true ? UserWithPublication[] : user[]>> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        publications: withPublications as boolean,
      },
    });
    return {
      ok: true,
      data: users as T extends true ? UserWithPublication[] : user[],
    };
  } catch (error) {
    console.error(error);
    return apiInternalError;
  } finally {
    await prisma.$disconnect();
  }
};

export { userGet, userGetAll };
