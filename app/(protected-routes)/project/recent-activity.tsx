import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";
import { RecentActivityClient } from "@/app/(protected-routes)/project/recent-activity.client";
import { getProject } from "@/app/(protected-routes)/project/utils";

export default async function RecentActivity() {
  const project = await getProject();

  const [ratings, issues, suggestions] = await Promise.all([
    getRatings(project.id),
    getIssues(project.id),
    getSuggestions(project.id),
  ]);

  return (
    <RecentActivityClient
      ratings={ratings || []}
      issues={issues || []}
      suggestions={suggestions || []}
    />
  );
}
