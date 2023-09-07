import { cache } from "react";
import { createServerComponentClient } from "@/app/(protected-routes)/project/utils";

export const getIssues = cache(async (projectId: string) => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("projects")
    .select(`id, issues ( * )`)
    .eq("id", projectId)
    .maybeSingle();

  return data?.issues;
});
