import { format, parseISO } from "date-fns";
import {
  createActivityTimeline,
  createChartData,
} from "@/app/(protected-routes)/project/utils";
import { Database } from "@/types/supabase";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";

export default async function RecentActivity() {
  const user = await getPublicUser();
  const project = await getProject(user);

  const [ratings, issues, suggestions, thisMonthsRatings] = await Promise.all([
    getRatings(project.id),
    getIssues(project.id),
    getSuggestions(project.id),
    createChartData(project),
  ]);

  let average = 0;
  if (ratings && ratings.length > 0) {
    average =
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length;
  }

  const timeline = createActivityTimeline(
    ratings || [],
    issues || [],
    suggestions || [],
  );

  return (
    <div className="space-y-6">
      {timeline.slice(0, 6).map((entry: any, index: number) => (
        <div className="flex items-center" key={index}>
          {entry.type === "rating" && (
            <>
              <StarIcon width={28} height={28} className="text-teal-500" />
              <p className="ml-3 text-sm font-medium leading-none">
                {entry.score} / 10
              </p>
              <div className="ml-auto hidden font-medium sm:block">
                {format(parseISO(entry.created_at), "d MMMM")}
              </div>
            </>
          )}

          {entry.type === "issue" && (
            <>
              <ExclamationTriangleIcon
                width={28}
                height={28}
                className="text-red-500"
              />
              <p className="ml-3 text-sm font-medium leading-none">
                {entry.title}
              </p>
              <div className="ml-auto hidden font-medium sm:block">
                {format(parseISO(entry.created_at), "d MMMM")}
              </div>
            </>
          )}

          {entry.type === "suggestion" && (
            <>
              <LightBulbIcon
                width={28}
                height={28}
                className="text-amber-500"
              />
              <p className="ml-3 text-sm font-medium leading-none">
                {entry.title}
              </p>
              <div className="ml-auto hidden font-medium sm:block">
                {format(parseISO(entry.created_at), "d MMMM")}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
