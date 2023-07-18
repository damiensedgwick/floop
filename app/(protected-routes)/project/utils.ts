import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { adverbs } from "@/lib/adverbs";
import { nouns } from "@/lib/nouns";

export async function getPublicUser() {
  try {
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
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}

export async function getProject(
  user: Database["public"]["Tables"]["users"]["Row"],
) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data } = await supabase
      .from("projects")
      .select()
      .eq("owner_id", user.id)
      .single();

    if (!data) {
      return await createNewProject(user);
    }

    return data;
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}

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

    return data[0];
  } catch (error) {
    console.error(error);
    redirect("/auth/sign-in");
  }
}

export async function getThisMonthsRatings(
  project: Database["public"]["Tables"]["projects"]["Row"],
) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
  const currentYear = currentDate.getFullYear();

  // Get the start and end dates of the current month
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Subtracting 1 to get zero-based month
  const endOfMonth = new Date(currentYear, currentMonth, 0);

  const { data } = await supabase
    .from("ratings")
    .select()
    .eq("project_id", project.id)
    .gte("created_at", startOfMonth.toISOString())
    .lt("created_at", endOfMonth.toISOString());

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
      date: getOrdinalSuffix(parseInt(date)),
    }));
  }

  return [];
}

export async function getRatings(projectId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data } = await supabase
      .from("ratings")
      .select()
      .eq("project_id", projectId);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getIssues(projectId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data } = await supabase
      .from("issues")
      .select()
      .eq("project_id", projectId);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSuggestions(projectId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data } = await supabase
      .from("suggestions")
      .select()
      .eq("project_id", projectId);

    return data;
  } catch (error) {
    console.error(error);
  }
}
