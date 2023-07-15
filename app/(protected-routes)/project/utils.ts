import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { adverbs } from "@/lib/adverbs";
import { nouns } from "@/lib/nouns";
import { revalidatePath } from "next/cache";

export async function getPublicUser() {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/auth/sign-in");
    }

    return user;
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}

export async function getProject(user: User) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data } = await supabase
      .from("projects")
      .select()
      .eq("owner_id", user.id)
      .single();

    if (!data) {
      await createNewProject(user);
      // revalidatePath("project/dashboard");
    }

    return data;
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}

export async function createNewProject(user: User) {
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

    if (data) {
      await supabase
        .from("users")
        .update({ project_id: data[0].id })
        .eq("id", user.id);
    }

    return data;
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}