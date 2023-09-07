import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import IssuesDataTable from "@/app/(protected-routes)/project/issues/issues-data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Issues</h1>
          <Separator />
          <Suspense
            fallback={
              <div className="space-y-6">
                <div className="flex justify-between items center">
                  <Skeleton className="w-[380px] h-10" />
                  <Skeleton className="w-[130px] h-10" />
                </div>
                <Skeleton className="h-[500px]" />
                <div className="flex justify-end space-x-4">
                  <Skeleton className="w-[100px] h-8" />
                  <Skeleton className="w-[100px] h-8" />
                </div>
              </div>
            }
          >
            <IssuesDataTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
