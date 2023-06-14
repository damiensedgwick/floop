import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getProject(
  sb: SupabaseClient<Database>,
  userId: string | null
) {
  const { data, error } = await sb
    .from("project")
    .select()
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getRatings(
  sb: SupabaseClient<Database>,
  projectId: string
) {
  const { data, error } = await sb
    .from("rating")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getIssues(
  sb: SupabaseClient<Database>,
  projectId: string
) {
  const { data, error } = await sb
    .from("issue")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getSuggestions(
  sb: SupabaseClient<Database>,
  projectId: string
) {
  const { data, error } = await sb
    .from("suggestion")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}
