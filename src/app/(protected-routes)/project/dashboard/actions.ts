import { auth } from "@clerk/nextjs/server";
import supabase from "@/lib/supabase";

export async function getProject() {
  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = supabase(token);

  const projectUser = await client
    .from("project_users")
    .select()
    .eq("user_id", userId)
    .single();

  const { data: projectUserData, error: projectUserError } = projectUser;

  if (projectUserError) {
    console.log(projectUserError);

    throw new Error("Error fetching projectUserData");
  }

  const project = await client
    .from("project")
    .select()
    .eq("id", projectUserData.project_id)
    .single();

  const { data: projectData, error: projectError } = project;

  if (projectError) {
    console.log(projectError);

    throw new Error("Error fetching projectData");
  }

  return projectData;
}

export async function getRatings(projectId: string) {
  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = supabase(token);

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
  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = supabase(token);

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
  const { getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = supabase(token);

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
