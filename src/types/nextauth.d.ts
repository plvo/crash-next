import { $Enums } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        role: $Enums.Role
    }

    interface Session {
        user: {
            id: string
            name: string | null
            email: string | null
            role: $Enums.Role
        } 
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: $Enums.Role
    }
}