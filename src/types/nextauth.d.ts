import type { $Enums } from '@prisma/client';
import 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    image: string;

    id: string;
    pseudo: string;
    role: $Enums.Role;
  }
}

declare module 'next-auth' {
  interface User {
    name: string;
    email: string;
    image: string;

    id: string;
    pseudo: string;
    role: $Enums.Role;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      image: string;

      id: string;
      pseudo: string;
      role: $Enums.Role;
    };
  }
}
