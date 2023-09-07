import { cache } from "react";
import { createServerComponentClient } from "@/app/(protected-routes)/project/utils";

export const getRatings = cache(async (projectId: string) => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("projects")
    .select(`id, ratings ( * )`)
    .eq("id", projectId)
    .maybeSingle();

  return data?.ratings;
});
