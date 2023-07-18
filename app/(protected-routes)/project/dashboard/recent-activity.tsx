import { format, parseISO } from "date-fns";
import { createActivityTimeline } from "@/app/(protected-routes)/project/dashboard/utils";
import { Database } from "@/types/supabase";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

type Props = {
  ratings: Database["public"]["Tables"]["ratings"]["Row"][];
  issues: Database["public"]["Tables"]["issues"]["Row"][];
  suggestions: Database["public"]["Tables"]["suggestions"]["Row"][];
};

export function RecentActivity({ ratings, issues, suggestions }: Props) {
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
                {entry.score}
              </p>
              <div className="ml-auto font-medium hidden sm:block">
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
              <div className="ml-auto font-medium hidden sm:block">
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
              <div className="ml-auto font-medium hidden sm:block">
                {format(parseISO(entry.created_at), "d MMMM")}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
