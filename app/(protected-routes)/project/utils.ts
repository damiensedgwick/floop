import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient as supabaseCreateServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { adverbs } from "@/lib/adverbs";
import { nouns } from "@/lib/nouns";
import { revalidatePath } from "next/cache";

export const getPublicUser = cache(async () => {
  const supabase = createServerComponentClient();

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

const getAuthUser = cache(async () => {
  const supabase = createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
});

export const createServerComponentClient = cache(() => {
  return supabaseCreateServerComponentClient<Database>({ cookies });
});

export const getProject = cache(async () => {
  const supabase = createServerComponentClient();
  const user = await getAuthUser();

  const { data, error } = await supabase
    .from("users")
    .select(`id, email, projects!project_users (*)`)
    .match({ id: user.id })
    .maybeSingle();

  if (error) {
    console.log(error);
    throw error;
  }

  if (!data) {
    throw new Error("This error should not happen *Tom Sherman");
  }

  return data.projects[0];
});

export async function createNewProject(
  user: Database["public"]["Tables"]["users"]["Row"],
) {
  try {
    const supabase = createServerComponentClient();

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

    await supabase.from("project_users").insert({
      project_id: data[0].id,
      user_id: user.id,
    });

    revalidatePath("/project");
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

export const getThisMonthsRatings = cache(
  async (project: Database["public"]["Tables"]["projects"]["Row"]) => {
    const supabase = createServerComponentClient();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0);

    const { data } = await supabase
      .from("ratings")
      .select()
      .eq("project_id", project.id)
      .gte("created_at", startOfMonth.toISOString())
      .lt("created_at", endOfMonth.toISOString());

    return data;
  },
);

export async function createChartData(
  project: Database["public"]["Tables"]["projects"]["Row"],
) {
  const data = await getThisMonthsRatings(project);

  const getOrdinalSuffix = (number: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;

    return (
      number +
      (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0])
    );
  };

  if (data) {
    const ratingsByDate: Record<number, number[]> = {};

    data.forEach((rating) => {
      const date = new Date(rating.created_at!).getDate();
      if (ratingsByDate[date]) {
        ratingsByDate[date].push(rating.score);
      } else {
        ratingsByDate[date] = [rating.score];
      }
    });

    return Object.entries(ratingsByDate).map(([date, scores]) => ({
      score: scores.reduce((total, score) => total + score, 0) / scores.length,
      submissions: scores.length,
      date: getOrdinalSuffix(parseInt(date)),
    }));
  }

  return [];
}
