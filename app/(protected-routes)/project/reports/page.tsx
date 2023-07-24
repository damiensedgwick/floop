import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);

  console.log("project", project);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Reports</h1>
          <Separator />

          {project.subscription_type === "hobby" ? (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
                  <p className="text-sm text-yellow-700">
                    Subscription needed to access reports.
                  </p>
                  <p className="text-sm text-yellow-700">
                    <Link
                      href="#"
                      className="font-medium text-yellow-700 underline hover:text-yellow-600"
                    >
                      Sign up for a subscription
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
