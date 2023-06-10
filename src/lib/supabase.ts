import { createClient } from "@supabase/supabase-js";

export default async function supabase(supabaseAccessToken: string | null) {
  const sb = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_KEY),
    { global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } } }
  );

  return sb;
}
