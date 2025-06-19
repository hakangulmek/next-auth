import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & { role?: string; id?: string };
  }
  interface User extends DefaultUser {
    role?: string;
    id?: string;
  }
}

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // JWT token'a kullanıcı bilgilerini ekleme
      if (user) {
        token.role = (user as { role?: string }).role || "user";
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Session'a JWT'den bilgileri aktarma
      if (session.user) {
        session.user.role = token.role as string | undefined;
        session.user.id = token.userId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
