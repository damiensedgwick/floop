import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import Team from "@/app/(protected-routes)/project/team/team";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="py-1.5 text-xl font-semibold leading-7">Team</h1>
          <Separator />
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="w-full h-44" />
                <Separator />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Skeleton className="rounded-lg shadow h-44" />
                  <Skeleton className="rounded-lg shadow h-44" />
                  <Skeleton className="rounded-lg shadow h-44" />
                </div>
              </div>
            }
          >
            <Team />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
