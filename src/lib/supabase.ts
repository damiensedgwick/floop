import { Database } from "@/types/supabase";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default function supabase(
  supabaseAccessToken: string | null
): SupabaseClient<Database> {
  return createClient<Database>(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_KEY),
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      auth: { persistSession: false },
    }
  );
}
