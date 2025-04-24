import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: 'signIn' | 'signUp' | 'update';
      session?: any;
    }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          pseudo: user.pseudo,
          role: user.role,
        });
      }
      if (trigger === 'update' && session) {
        Object.assign<Partial<JWT>, Partial<User>>(token, {
          name: session.name || token.name,
          email: session.email || token.email,
          pseudo: session.pseudo || token.pseudo,
          image: session.image || token.image,
          role: session.role || token.role,
        });
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.pseudo = token.pseudo;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide email and password');
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) throw new Error('Email or password is incorrect');
          console.log(user);

          const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

          if (isCorrectPassword) {
            return {
              name: user.name,
              email: user.email,
              id: user.id,
              role: user.role,
              pseudo: user.pseudo,
              image: user.profileImg,
            };
          }

          throw new Error('Email or password is incorrect');
        } catch (error) {
          console.error('An error occurred:', error);
          throw new Error(error as string);
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
};
