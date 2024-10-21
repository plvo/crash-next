import { $Enums } from "@prisma/client";
import "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    pseudo: string;
    role: $Enums.Role;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    pseudo: string;
    role: $Enums.Role;
  }

  interface Session {
    user: {
      id: string;
      pseudo: string;
      role: $Enums.Role;
    };
  }
}
