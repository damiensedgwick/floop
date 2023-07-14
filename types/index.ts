import { Database } from "./supabase";

export type PublicUser = Database["public"]["Tables"]["users"]["Row"] | null;
