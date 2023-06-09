import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  String(process.env.NEXT_PUBLIC_SUPABASE_URL),
  "public-anon-key"
);
