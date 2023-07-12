import { Database } from "./supabase";

export type PublicUser = Database["public"]["Tables"]["user"]["Row"] | null;
