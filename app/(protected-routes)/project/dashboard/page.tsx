import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/app/(protected-routes)/project/dashboard/overview";
import { RecentActivity } from "@/app/(protected-routes)/project/dashboard/recent-activity";
import { cn } from "@/lib/utils";
import {
  createChartData,
  getScoreTextColor,
} from "@/app/(protected-routes)/project/dashboard/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";
import FloopWidgetButton from "@/components/floop-widget.client";

export default async function Page() {
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

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-6">Dashboard</h1>
            <div>
              <FloopWidgetButton
                projectId={process.env.FLOOP_PROJECT_ID!}
                userEmail={user.email}
              />
            </div>
          </div>
          <Separator />

          {project.total_submissions === 0 ? (
            <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 ml-3 md:flex md:items-center md:justify-between">
                  <p className="text-sm text-yellow-700">
                    You have 0 submissions.
                  </p>
                  <p className="text-sm text-yellow-700">
                    <Link
                      href="#"
                      className="font-medium text-yellow-700 underline hover:text-yellow-600"
                    >
                      Are you setup correctly?
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-4">
            <h2 className="text-lg font-medium leading-6">All Time Stats</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Card className="shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      "text-2xl font-bold",
                      getScoreTextColor(Number(average.toFixed())),
                    )}
                  >
                    {average.toFixed() || 0} / 10
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {ratings?.length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {issues?.length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {suggestions?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium leading-6">Monthly Overview</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 shadow lg:col-span-4">
                <CardHeader>
                  <CardTitle>Ratings</CardTitle>
                  <CardDescription>
                    How your ratings look for{" "}
                    {new Date().toLocaleString("default", {
                      month: "long",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview ratings={thisMonthsRatings} />
                </CardContent>
              </Card>
              <Card className="col-span-1 shadow lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    What your users have been saying
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity
                    ratings={ratings || []}
                    issues={issues || []}
                    suggestions={suggestions || []}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
