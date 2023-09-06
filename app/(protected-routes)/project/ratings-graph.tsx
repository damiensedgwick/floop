import { RatingsGraphClient } from "@/app/(protected-routes)/project/ratings-graph.client";
import { getProject } from "@/app/(protected-routes)/project/utils";
import { createChartData } from "@/app/(protected-routes)/project/utils";

export default async function RatingsGraph() {
  const project = await getProject();

  const thisMonthsRatings = await createChartData(project);

  return <RatingsGraphClient ratings={thisMonthsRatings} />;
}
