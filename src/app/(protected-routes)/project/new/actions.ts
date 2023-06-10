import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitForm(formData: FormData) {
  "use server";

  const { userId, getToken } = auth();

  if (!userId) {
    throw new Error("You must be signed in to create a project.");
  }

  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("You must provide a name to create a project.");
  }

  try {
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const sb = await supabase(supabaseAccessToken);

    const { error } = await sb.from("project").insert({
      name: name,
      owner_id: userId,
    });

    console.log(error);
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }

  redirect("/project/dashboard");
}
