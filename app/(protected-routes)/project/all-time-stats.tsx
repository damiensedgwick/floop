import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import AllTimeStatsCards from "@/app/(protected-routes)/project/all-time-stats-cards";

export default async function AllTimeStats() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium leading-7">All Time Stats</h2>
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Card className="shadow">
                <CardContent className="p-8 space-y-2.5">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-1/2" />
                </CardContent>
              </Card>{" "}
              <Card className="shadow">
                <CardContent className="p-8 space-y-2.5">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-1/2" />
                </CardContent>
              </Card>{" "}
              <Card className="shadow">
                <CardContent className="p-8 space-y-2.5">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-1/2" />
                </CardContent>
              </Card>{" "}
              <Card className="shadow">
                <CardContent className="p-8 space-y-2.5">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-5 w-1/2" />
                </CardContent>
              </Card>
            </div>
          </div>
        }
      >
        <AllTimeStatsCards />
      </Suspense>
    </div>
  );
}
