import { auth } from "@clerk/nextjs";
import { client } from "@/lib/supabase";

export async function getProject() {
  const { userId } = auth();
  const sb = await client();

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

export async function getRatings(projectId: string) {
  const sb = await client();

  const { data, error } = await sb
    .from("rating")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getIssues(projectId: string) {
  const sb = await client();

  const { data, error } = await sb
    .from("issue")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getSuggestions(projectId: string) {
  const sb = await client();

  const { data, error } = await sb
    .from("suggestion")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}
