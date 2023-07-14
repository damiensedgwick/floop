import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function checkUserAndProject() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const project = await supabase
    .from("users")
    .select("project_id")
    .eq("id", user.id)
    .single();

  if (!project.data) {
    redirect("/project/new");
  }

  return { user, project };
}
