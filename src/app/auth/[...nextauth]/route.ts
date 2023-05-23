import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/src";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  adapter: SupabaseAdapter({
    url: "",
    secret: "",
  }),
  callbacks: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
