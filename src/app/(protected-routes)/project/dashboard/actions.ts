import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";

export async function getProject() {
  "use server";

  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const client = await supabase(token);

  const projectUser = await client
    .from("project_users")
    .select()
    .eq("user_id", userId)
    .single();

  const { data: projectUserData, error: projectUserError } = projectUser;

  if (projectUserError) {
    // throw new Error(
    //   `Error getting project from project_users: ${projectUserError.message}`
    // );

    return;
  }

  const project = await client
    .from("project")
    .select()
    .eq("id", projectUserData.project_id)
    .single();

  const { data: projectData, error: projectError } = project;

  if (projectError) {
    // throw new Error(
    //   `Error getting project from project: ${projectError.message}`
    // );

    return;
  }

  return projectData;
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
