import { Prisma } from "@prisma/client";

type UserWithPublication = Prisma.userGetPayload<{
  include: {
    publications: true;
  };
}>;