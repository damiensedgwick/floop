import { getPublicUser } from "@/app/(protected-routes)/project/utils";

import { Separator } from "@/components/ui/separator";
import FloopWidgetButton from "@/components/floop-widget.client";

import MonthlyOverview from "@/app/(protected-routes)/project/monthly-overview";
import AllTimeStats from "@/app/(protected-routes)/project/all-time-stats";

export default async function Page() {
  const user = await getPublicUser();

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-6">Dashboard</h1>
            <FloopWidgetButton
              projectId={process.env.FLOOP_PROJECT_ID!}
              userEmail={user.email}
            />
          </div>
          <Separator />
          <AllTimeStats />
          <MonthlyOverview />
        </div>
      </div>
    </div>
  );
}
