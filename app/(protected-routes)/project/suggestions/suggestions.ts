import { cache } from "react";
import { createServerComponentClient } from "@/app/(protected-routes)/project/utils";

export const getSuggestions = cache(async (projectId: string) => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("suggestions")
    .select()
    .eq("project_id", projectId);

  return data;
});
