import NextAuth, { NextAuthOptions } from "next-auth";
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
    url: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    secret: String(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY),
  }),
  callbacks: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
