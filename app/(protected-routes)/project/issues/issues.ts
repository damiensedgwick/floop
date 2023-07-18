import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function getIssues(projectId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data } = await supabase
      .from("issues")
      .select()
      .eq("project_id", projectId);

    return data;
  } catch (error) {
    console.error(error);
  }
}
