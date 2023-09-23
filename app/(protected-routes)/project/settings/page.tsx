import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import Settings from "@/app/(protected-routes)/project/settings/settings";

export default function Page() {
  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-7">Settings</h1>
            <ThemeToggle />
          </div>
          <Separator />
          <Suspense
            fallback={
              <div className="space-y-6">
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
              </div>
            }
          >
            <Settings />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
