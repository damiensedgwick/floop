import { Separator } from "@/components/ui/separator";
import MonthlyOverview from "@/app/(protected-routes)/project/monthly-overview";
import AllTimeStats from "@/app/(protected-routes)/project/all-time-stats";
import FloopWidgetButton from "@/components/floop-widget.client";
import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function Page() {
  const user = await getPublicUser();

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-7">Dashboard</h1>
            <FloopWidgetButton
              projectId={process.env.FLOOP_PROJECT_ID!}
              userEmail={user.email}
            />
          </div>
          <Separator />
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-7 max-w-[115px]" />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <Card className="shadow">
                    <CardContent className="p-8 space-y-2.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>{" "}
                  <Card className="shadow">
                    <CardContent className="p-8 space-y-2.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>{" "}
                  <Card className="shadow">
                    <CardContent className="p-8 space-y-2.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>{" "}
                  <Card className="shadow">
                    <CardContent className="p-8 space-y-2.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            }
          >
            <AllTimeStats />
          </Suspense>

          <Suspense fallback={<p>LOADING ORANGE...</p>}>
            <MonthlyOverview />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
