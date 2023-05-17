import NextAuth from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

const handler = NextAuth({
  providers: [],
  adapter: SupabaseAdapter({
    url: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    secret: String(process.env.SUPABASE_SERVICE_ROLE_KEY),
  }),
});

export { handler as GET, handler as POST };
