import NextAuth, { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  adapter: SupabaseAdapter({
    url: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    secret: String(process.env.SUPABASE_SERVICE_ROLE_KEY),
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = String(process.env.SUPABASE_JWT_SECRET);

      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };

        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
