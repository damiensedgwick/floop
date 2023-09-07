import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingsGraph from "@/app/(protected-routes)/project/ratings-graph";
import RecentActivity from "@/app/(protected-routes)/project/recent-activity";
import { Skeleton } from "@/components/ui/skeleton";

export default function MonthlyOverview() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium leading-7">Monthly Overview</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-7">
        <Card className="col-span-1 shadow xl:col-span-4">
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
            <Suspense
              fallback={
                <div className="p-6 pt-0">
                  <Skeleton className="h-[310px] w-full mb-4" />
                  <Skeleton className="h-[12px] w-[150px] mx-auto" />
                </div>
              }
            >
              <RatingsGraph />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-1 shadow xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What your users have been saying</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="space-y-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              }
            >
              <RecentActivity />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
