import { auth } from "@clerk/nextjs/server";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitForm(formData: FormData) {
  "use server";

  const { userId, getToken } = auth();

  if (!userId) {
    throw new Error("You must be signed in to create a project");
  }

  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("You must provide a name to create a project");
  }

  try {
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const sb = await supabase(supabaseAccessToken);

    const { data } = await sb
      .from("project")
      .insert({
        name: name,
        owner_id: userId,
      })
      .select();

    if (data) {
      await sb.from("project_users").insert({
        project_id: data[0].id,
        user_id: userId,
      });
    }
  } catch (error) {
    throw new Error("Error creating project");
  }

  redirect("/project/dashboard");
}
