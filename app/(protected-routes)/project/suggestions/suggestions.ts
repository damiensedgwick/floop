import { cache } from "react";
import { createServerComponentClient } from "@/app/(protected-routes)/project/utils";

export const getSuggestions = cache(async (projectId: string) => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("projects")
    .select(`id, suggestions ( * )`)
    .eq("id", projectId)
    .maybeSingle();

  return data?.suggestions;
});
