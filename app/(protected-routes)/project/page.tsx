import {
  createChartData,
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import MonthlyOverview from "@/app/(protected-routes)/project/monthly-overview";
import AllTimeStats from "@/app/(protected-routes)/project/all-time-stats";
import FloopWidgetButton from "@/components/floop-widget.client";
import RecentActivity from "@/app/(protected-routes)/project/recent-activity";
import { RecentActivityClient } from "@/app/(protected-routes)/project/recent-activity.client";
import RatingsGraph from "@/app/(protected-routes)/project/ratings-graph";
import { RatingsGraphClient } from "@/app/(protected-routes)/project/ratings-graph.client";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";

export default async function Page() {
  const project = await getProject();

  const [ratings, issues, suggestions, user, thisMonthsRatings] =
    await Promise.all([
      getRatings(project.id),
      getIssues(project.id),
      getSuggestions(project.id),
      getPublicUser(),
      createChartData(project),
    ]);

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-7">Dashboard</h1>
            <FloopWidgetButton
              projectId={process.env.FLOOP_PROJECT_ID!}
              userEmail={user.email}
            />
          </div>
          <Separator />

          <AllTimeStats />

          <MonthlyOverview>
            <RatingsGraph>
              <RatingsGraphClient ratings={thisMonthsRatings} />
            </RatingsGraph>

            <RecentActivity>
              <RecentActivityClient
                ratings={ratings || []}
                issues={issues || []}
                suggestions={suggestions || []}
              />
            </RecentActivity>
          </MonthlyOverview>
        </div>
      </div>
    </div>
  );
}
