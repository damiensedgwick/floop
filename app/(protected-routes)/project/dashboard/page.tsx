import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);

  console.log("project", project);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {project.total_submissions === 0 ? (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between md:items-center">
                  <p className="text-sm text-yellow-700">
                    You have 0 submissions.
                  </p>
                  <p className="text-sm text-yellow-700">
                    <Link
                      href="#"
                      className="font-medium text-yellow-700 underline hover:text-yellow-600"
                    >
                      Are you setup correctly?
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
}
