import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";

export async function getProject() {
  "use server";

  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = await supabase(token);

  const { data, error } = await client
    .from("project")
    .select()
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    console.log(error);

    throw new Error("Error getting project for the dashboard");
  }

  return data;
}

export async function getRatings(projectId: string) {
  "use server";

  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = await supabase(token);

  const { data, error } = await client
    .from("rating")
    .select()
    .eq("project_id", projectId);

  if (error) {
    console.log(error);

    throw new Error("Error fetching ratings for the dashboard");
  }

  return data;
}

export async function getIssues(projectId: string) {
  "use server";

  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = await supabase(token);

  const { data, error } = await client
    .from("issue")
    .select()
    .eq("project_id", projectId);

  if (error) {
    console.log(error);

    throw new Error("Error fetching issues for the dashboard");
  }

  return data;
}

export async function getSuggestions(projectId: string) {
  "use server";

  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = await supabase(token);

  const { data, error } = await client
    .from("suggestion")
    .select()
    .eq("project_id", projectId);

  if (error) {
    console.log(error);

    throw new Error("Error fetching suggestions for the dashboard");
  }

  return data;
}
