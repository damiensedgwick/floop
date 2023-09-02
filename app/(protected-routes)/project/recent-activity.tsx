import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";
import { RecentActivityClient } from "@/app/(protected-routes)/project/recent-activity.client";

export default async function RecentActivity() {
  const user = await getPublicUser();
  const project = await getProject(user);

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
