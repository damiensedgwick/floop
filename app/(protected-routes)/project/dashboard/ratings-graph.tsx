import { RatingsGraphClient } from "@/app/(protected-routes)/project/dashboard/ratings-graph.client";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { createChartData } from "@/app/(protected-routes)/project/dashboard/utils";

export default async function RatingsGraph() {
  const user = await getPublicUser();
  const project = await getProject(user);

  const thisMonthsRatings = await createChartData(project);

  return <RatingsGraphClient ratings={thisMonthsRatings} />;
}
