import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "@/app/(protected-routes)/project/profile/profile";

export default function Page() {
  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="py-1.5 text-xl font-semibold leading-7">Profile</h1>
          <Separator />
          <Suspense
            fallback={
              <div className="space-y-6">
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
              </div>
            }
          >
            <Profile />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
