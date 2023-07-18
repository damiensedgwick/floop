import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: result } = await supabase
    .from("users")
    .select()
    .or(`id.eq.${project.owner_id}, project_id.eq.${project.id}`);

  const owner = result?.find((item) => item.id === project.owner_id);
  const users = result?.filter((item) => item.project_id === project.id);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-8 sm:flex-auto">
          <h1 className="text-base font-semibold leading-6">Settings</h1>
          <Separator />
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {project.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Owner</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {owner?.first_name + " " + owner?.last_name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Subscription Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {project.subscription_type}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Subscription Expiry
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {project.subscription_expiry || "N/A"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Submission Count
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {project.total_submissions}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Team Size
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {users?.length}
                  </dd>
                </div>{" "}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Created Date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {project.created_at}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
