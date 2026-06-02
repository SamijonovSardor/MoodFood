import type { NextAuthOptions, DefaultSession, Profile } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isOnboarded: boolean;
      preferredCuisines?: string;
    } & DefaultSession["user"];
  }
  interface User {
    isOnboarded?: boolean;
    preferredCuisines?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, profile, trigger, session, isNewUser }) {
      if (user) {
        token.id = user.id ?? (profile as Profile | undefined)?.sub;
        token.isOnboarded = isNewUser ? false : (user.isOnboarded ?? true);
        token.preferredCuisines = user.preferredCuisines ?? "";
      }
      
      // Update session dynamically when triggered from client
      if (trigger === "update" && session) {
        token.isOnboarded = session.isOnboarded;
        token.preferredCuisines = session.preferredCuisines ?? "";
      } else if (token.id && token.isOnboarded === undefined) {
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.id, token.id as string),
        });
        token.isOnboarded = dbUser?.isOnboarded ?? true;
        token.preferredCuisines = dbUser?.preferredCuisines ?? "";
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.isOnboarded = token.isOnboarded as boolean;
        session.user.preferredCuisines = token.preferredCuisines as string;
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);
