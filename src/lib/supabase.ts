import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs";

export default async function supabase(supabaseAccessToken: string | null) {
  return createClient<Database>(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_KEY),
    { global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } } }
  );
}

export async function client() {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: "supabase" });

  return supabase(supabaseAccessToken);
}
