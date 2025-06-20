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
      authorization: {
        params: {
          prompt: "login", // Her seferinde login ekranı göster
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account, user }) {
      if (account && profile) {
        console.log("Profile data:", profile); // Debug için

        // İlk girişte rolü profile'dan al
        const role = (profile as Record<string, any>)[
          "https://localhost:3000/role"
        ];

        console.log("Role from profile:", role); // Debug için

        token.role = role || "user";
        token.userId = token.sub;

        // Eğer role bilgisi profile'da yoksa, Auth0 Management API'den al
        if (!role && account.access_token) {
          try {
            const userInfoResponse = await fetch(
              `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
              {
                headers: {
                  Authorization: `Bearer ${account.access_token}`,
                },
              }
            );
            const userInfo = await userInfoResponse.json();
            console.log("UserInfo:", userInfo); // Debug için

            const userRole = userInfo["https://localhost:3000/role"];
            if (userRole) {
              token.role = userRole;
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Session'a JWT'den bilgileri aktarma
      if (session.user) {
        session.user.role = token.role as string | undefined;
        session.user.id = token.userId as string | undefined;
      }
      console.log("Final session:", session); // Debug için
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development", // Debug mode
});

export { handler as GET, handler as POST };
