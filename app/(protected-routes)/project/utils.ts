import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { adverbs } from "@/lib/adverbs";
import { nouns } from "@/lib/nouns";
import { revalidatePath } from "next/cache";

export const getPublicUser = cache(async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: publicUser } = await supabase
    .from("users")
    .select()
    .eq("id", user.id)
    .single();

  if (!publicUser) {
    redirect("/auth/sign-in");
  }

  return publicUser;
});

export const getProject = cache(
  async (user: Database["public"]["Tables"]["users"]["Row"]) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data } = await supabase
      .from("projects")
      .select()
      .eq("owner_id", user.id)
      .single();

    if (!data) {
      throw new Error("No project found for this user.");
    }

    return data;
  },
);

export async function createNewProject(
  user: Database["public"]["Tables"]["users"]["Row"],
) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    const { data } = await supabase
      .from("projects")
      .insert({
        name: `${randomAdverb}-nugget-${randomNoun}`,
        owner_id: user.id,
      })
      .select();

    if (!data) {
      console.log("No data returned from creating a new project.");
      redirect("/auth/sign-in");
    }

    await supabase
      .from("users")
      .update({ project_id: data[0].id })
      .eq("id", user.id);

    revalidatePath("/project/dashboard");
    revalidatePath("/project/issues");
    revalidatePath("/project/profile");
    revalidatePath("/project/ratings");
    revalidatePath("/project/reports");
    revalidatePath("/project/settings");
    revalidatePath("/project/suggestions");
    revalidatePath("/project/team");

    return data[0];
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}
