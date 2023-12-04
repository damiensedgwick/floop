import { getProject } from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Page() {
  const project = await getProject();

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Reports</h1>
          <Separator />
          <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
              <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
                <p className="text-sm text-yellow-700">
                  Reports will be here soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
