import { cache } from "react";
import { createServerComponentClient } from "@/app/(protected-routes)/project/utils";

export const getIssues = cache(async (projectId: string) => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("issues")
    .select()
    .eq("project_id", projectId);

  return data;
});
