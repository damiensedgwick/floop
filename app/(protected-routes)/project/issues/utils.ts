import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getThisMonthsSuggestions(
  project: Database["public"]["Tables"]["projects"]["Row"],
) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfMonth = new Date(currentYear, currentMonth, 0);

  const { data } = await supabase
    .from("issues")
    .select()
    .eq("project_id", project.id)
    .gte("created_at", startOfMonth.toISOString())
    .lt("created_at", endOfMonth.toISOString());

  return data;
}
