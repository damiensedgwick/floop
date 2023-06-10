import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";
import classNames from "@/lib/classnames";

export default async function Page() {
  const { userId, getToken } = auth();

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const sb = await supabase(supabaseAccessToken);

  const { data, error } = await sb
    .from("project")
    .select()
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    return <p>Error fetching your project</p>;
  }

  const project = data;

  if (!project) {
    redirect("/project/new");
  }

  const ratings = [];
  const issues = [];
  const suggestions = [];

  const stats = [
    { name: "Ratings", stat: ratings.length },
    { name: "Issues", stat: issues.length },
    { name: "Suggestions", stat: suggestions.length },
  ];

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
              getScoreTextColor(5),
              "mt-1 text-3xl font-semibold tracking-tight text-gray-900"
            )}
          >
            5 / 5
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
