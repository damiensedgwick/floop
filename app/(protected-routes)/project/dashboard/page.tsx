import {
  getIssues,
  getProject,
  getPublicUser,
  getRatings,
  getSuggestions,
  getThisMonthsRatings,
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
import { getScoreTextColor } from "@/app/(protected-routes)/project/dashboard/utils";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const thisMonthsRatings = await getThisMonthsRatings(project);

  const [ratings, issues, suggestions] = await Promise.all([
    getRatings(project.id),
    getIssues(project.id),
    getSuggestions(project.id),
  ]);

  let average = 0;
  if (ratings && ratings.length > 0) {
    average =
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length;
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-base font-semibold leading-6">Dashboard</h1>
          <Separator />

          {project.total_submissions === 0 ? (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
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

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                  {average.toFixed()} / 10
                </div>
              </CardContent>
            </Card>
            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ratings?.length || 0}</div>
              </CardContent>
            </Card>
            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{issues?.length || 0}</div>
              </CardContent>
            </Card>
            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {suggestions?.length || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4 shadow">
              <CardHeader>
                <CardTitle>Floop Rating</CardTitle>
                <CardDescription>
                  Your average daily ratings for{" "}
                  {new Date().toLocaleString("default", {
                    month: "long",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview ratings={thisMonthsRatings} />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3 shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  You received 1 submission this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
