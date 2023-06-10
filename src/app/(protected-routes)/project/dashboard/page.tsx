import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";
import classNames from "@/lib/classnames";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getProject(
  sb: SupabaseClient<any, "public", any>,
  userId: string | null
) {
  const { data, error } = await sb
    .from("project")
    .select()
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getRatings(
  sb: SupabaseClient<any, "public", any>,
  projectId: string
) {
  const { data, error } = await sb
    .from("rating")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getIssues(
  sb: SupabaseClient<any, "public", any>,
  projectId: string
) {
  const { data, error } = await sb
    .from("issue")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export async function getSuggestions(
  sb: SupabaseClient<any, "public", any>,
  projectId: string
) {
  const { data, error } = await sb
    .from("suggestion")
    .select()
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Error: ${error}`);
  }

  return data;
}

export default async function Page() {
  const { userId, getToken } = auth();

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const sb = await supabase(supabaseAccessToken);

  const project = await getProject(sb, userId);

  if (!project) {
    redirect("/project/new");
  }

  const ratings = await getRatings(sb, project.id);
  const issues = await getIssues(sb, project.id);
  const suggestions = await getSuggestions(sb, project.id);

  const stats = [
    { name: "Ratings", stat: ratings.length },
    { name: "Issues", stat: issues.length },
    { name: "Suggestions", stat: suggestions.length },
  ];

  const average30DayScore =
    ratings.length > 0
      ? Math.round(
          ratings.reduce((score, { rating }) => score + Number(rating), 0) /
            ratings.length
        )
      : 0;

  function getScoreTextColor(score: number): string {
    switch (score) {
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-amber-500";
      case 4:
        return "text-lime-500";
      case 5:
        return "text-green-500";
      default:
        return "text-black";
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        In the last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Floop score
          </dt>
          <dd
            className={classNames(
              getScoreTextColor(average30DayScore),
              "mt-1 text-3xl font-semibold tracking-tight text-gray-900"
            )}
          >
            {average30DayScore} / 5
          </dd>
        </div>
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      <div className="py-8">
        <p>
          <i>Graph coming sooon...</i>
        </p>
      </div>
    </div>
  );
}
