import { prisma } from "@/app/libs/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { findUserByEmail } from "@/app/model/user.model";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  {SessionStrategy}  from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type {User} from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await findUserByEmail(credentials.email as string);
        if (!user || !user.password) return null;
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (isPasswordCorrect) return user;
        return null;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }:{ token:JWT; user?:User}) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }:{token:JWT; session:Session}) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages:{
    signIn: '/login',
  }
});
