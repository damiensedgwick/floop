import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getProject } from "@/app/(protected-routes)/project/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";

export default async function AllTimeStatsCards() {
  const project = await getProject();

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

  function getScoreTextColor(score: number): string {
    switch (score) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return "text-red-400";
      case 7:
      case 8:
        return "text-amber-400";
      case 9:
      case 10:
        return "text-mint";
      default:
        return "text-primary";
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
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
  );
}
