import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getScoreTextColor } from "@/app/(protected-routes)/project/utils";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";

export default async function AllTimeStats() {
  const user = await getPublicUser();
  const project = await getProject(user);

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
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ratings?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{issues?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suggestions?.length || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
