import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export const getRatings = cache(async (projectId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("ratings")
    .select()
    .eq("project_id", projectId);

  return data;
});
