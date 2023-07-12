import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function submitForm(formData: FormData) {
  "use server";

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("You must provide a name to create a project");
  }

  try {
    const { data } = await supabase
      .from("project")
      .insert({
        name: name,
        owner_id: user.id,
      })
      .select();

    if (data) {
      await supabase.from("project_users").insert({
        project_id: data[0].id,
        user_id: user.id,
      });
    }
  } catch (error) {
    throw new Error("Error creating project");
  }

  redirect("/project/dashboard");
}
